"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { ProposalCard } from "@/components/proposals/proposal-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import type { Proposal, User } from "@/lib/types"

export default function FreelancerProposalsPage() {
  const { data: session } = useSession()
  const [proposals, setProposals] = useState<(Proposal & { client: User })[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (session?.user?.id) {
      fetchProposals()
    }
  }, [session])

  const fetchProposals = async () => {
    try {
      const response = await fetch(`/api/proposals?freelancerId=${session?.user?.id}`)
      if (response.ok) {
        const data = await response.json()
        setProposals(data)
      }
    } catch (error) {
      console.error("Error fetching proposals:", error)
    } finally {
      setLoading(false)
    }
  }

  const pendingProposals = proposals.filter((p) => p.status === "pending")
  const acceptedProposals = proposals.filter((p) => p.status === "accepted")
  const rejectedProposals = proposals.filter((p) => p.status === "rejected")

  if (loading) {
    return <div>Loading proposals...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">My Proposals</h1>
        <p className="text-muted-foreground">Track your submitted proposals</p>
      </div>

      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">Pending ({pendingProposals.length})</TabsTrigger>
          <TabsTrigger value="accepted">Accepted ({acceptedProposals.length})</TabsTrigger>
          <TabsTrigger value="rejected">Rejected ({rejectedProposals.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingProposals.length === 0 ? (
            <Card>
              <CardContent className="text-center py-8">
                <p className="text-muted-foreground">No pending proposals</p>
              </CardContent>
            </Card>
          ) : (
            pendingProposals.map((proposal) => (
              <ProposalCard key={proposal.id} proposal={proposal} freelancer={proposal.client} />
            ))
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} freelancer={proposal.client} />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} freelancer={proposal.client} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
