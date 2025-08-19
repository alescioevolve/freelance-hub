import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { proposalRepository } from "@/lib/repositories"
import { createProposalSchema } from "@/lib/validators"

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const body = await request.json()
    const validatedData = createProposalSchema.parse(body)

    const proposal = await proposalRepository.create({
      ...validatedData,
      freelancerId: session.user.id,
      status: "pending",
    })

    return NextResponse.json(proposal)
  } catch (error) {
    console.error("Error creating proposal:", error)
    return NextResponse.json({ error: "Failed to create proposal" }, { status: 500 })
  }
}

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const jobId = searchParams.get("jobId")
    const freelancerId = searchParams.get("freelancerId")

    let proposals
    if (jobId) {
      proposals = await proposalRepository.findByJobId(jobId)
    } else if (freelancerId) {
      proposals = await proposalRepository.findByFreelancerId(freelancerId)
    } else {
      proposals = await proposalRepository.findAll()
    }

    return NextResponse.json(proposals)
  } catch (error) {
    console.error("Error fetching proposals:", error)
    return NextResponse.json({ error: "Failed to fetch proposals" }, { status: 500 })
  }
}
