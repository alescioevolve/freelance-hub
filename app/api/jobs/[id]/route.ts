import { type NextRequest, NextResponse } from "next/server"
import { mockJobs } from "@/seed/jobs"
import { mockProfiles } from "@/seed/users"

export async function GET(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const job = mockJobs.find((j) => j.id === params.id)

    if (!job) {
      return NextResponse.json({ message: "Job not found" }, { status: 404 })
    }

    // Enhance job with client information
    const clientProfile = mockProfiles.find((profile) => profile.userId === job.clientId)
    const enhancedJob = {
      ...job,
      client: clientProfile
        ? {
            name: `${clientProfile.firstName} ${clientProfile.lastName}`,
            location: clientProfile.location || "United States",
            rating: clientProfile.rating,
            jobsPosted: 5, // Mock data
          }
        : undefined,
    }

    return NextResponse.json(enhancedJob)
  } catch (error) {
    console.error("Failed to fetch job:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
