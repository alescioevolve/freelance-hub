import { NextResponse } from "next/server"
import { mockJobs } from "@/seed/jobs"
import { mockProfiles } from "@/seed/users"

export async function GET() {
  try {
    // Enhance jobs with client information
    const enhancedJobs = mockJobs
      .filter((job) => job.status === "active")
      .map((job) => {
        const clientProfile = mockProfiles.find((profile) => profile.userId === job.clientId)
        return {
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
      })

    return NextResponse.json(enhancedJobs)
  } catch (error) {
    console.error("Failed to fetch jobs:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}
