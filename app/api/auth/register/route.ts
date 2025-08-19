import { type NextRequest, NextResponse } from "next/server"
import bcrypt from "bcryptjs"
import { registerSchema } from "@/lib/validators"
import { UserRepository, ProfileRepository } from "@/lib/repositories"
import { logger } from "@/lib/logger"
import { rateLimit } from "@/lib/rate-limiter"

export async function POST(request: NextRequest) {
  const ip = request.ip || "127.0.0.1"

  // Rate limiting
  if (!rateLimit(ip, 5, 15 * 60 * 1000)) {
    return NextResponse.json({ message: "Too many registration attempts. Please try again later." }, { status: 429 })
  }

  try {
    const body = await request.json()

    // Validate input
    const validatedData = registerSchema.parse(body)

    // Check if user already exists
    const existingUser = UserRepository.findByEmail(validatedData.email)
    if (existingUser) {
      return NextResponse.json({ message: "User with this email already exists" }, { status: 400 })
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(validatedData.password, 12)

    // Create user
    const user = UserRepository.create({
      email: validatedData.email,
      password: hashedPassword,
      role: validatedData.role,
      isActive: true,
    })

    // Create profile
    ProfileRepository.create({
      userId: user.id,
      firstName: validatedData.firstName,
      lastName: validatedData.lastName,
      bio: "",
      skills: [],
      rating: 0,
      totalEarnings: 0,
      completedJobs: 0,
    })

    logger.info("User registered successfully", { userId: user.id, email: user.email })

    return NextResponse.json({ message: "User created successfully" }, { status: 201 })
  } catch (error) {
    logger.error("Registration error", error)

    if (error instanceof Error && error.name === "ZodError") {
      return NextResponse.json({ message: "Invalid input data" }, { status: 400 })
    }

    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
