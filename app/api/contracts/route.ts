import { type NextRequest, NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { contractRepository } from "@/lib/repositories"

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions)
    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { searchParams } = new URL(request.url)
    const clientId = searchParams.get("clientId")
    const freelancerId = searchParams.get("freelancerId")

    let contracts
    if (clientId) {
      contracts = await contractRepository.findByClientId(clientId)
    } else if (freelancerId) {
      contracts = await contractRepository.findByFreelancerId(freelancerId)
    } else {
      contracts = await contractRepository.findAll()
    }

    return NextResponse.json(contracts)
  } catch (error) {
    console.error("Error fetching contracts:", error)
    return NextResponse.json({ error: "Failed to fetch contracts" }, { status: 500 })
  }
}
