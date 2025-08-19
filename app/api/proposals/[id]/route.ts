import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { proposalRepository, contractRepository } from "@/lib/repositories"

export async function PATCH(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { status } = await request.json()
    const proposal = await proposalRepository.updateStatus(params.id, status)

    // If proposal is accepted, create a contract
    if (status === "accepted") {
      await contractRepository.create({
        jobId: proposal.jobId,
        clientId: session.user.id,
        freelancerId: proposal.freelancerId,
        totalAmount: proposal.proposedBudget,
        deadline: new Date(Date.now() + proposal.deliveryTime * 24 * 60 * 60 * 1000).toISOString(),
        status: "active",
      })
    }

    return NextResponse.json(proposal)
  } catch (error) {
    console.error("Error updating proposal:", error)
    return NextResponse.json({ error: "Failed to update proposal" }, { status: 500 })
  }
}
