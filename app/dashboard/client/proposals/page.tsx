"use client"

import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"
import { Card, CardContent } from "@/components/ui/card"
import { ProposalCard } from "@/components/proposals/proposal-card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useToast } from "@/hooks/use-toast"
import type { Proposal, User } from "@/lib/types"

export default function ClientProposalsPage() {
  const { data: session } = useSession()
  const [proposals, setProposals] = useState<(Proposal & { freelancer: User })[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    fetchProposals()
  }, [])

  const fetchProposals = async () => {
    try {
      const response = await fetch("/api/proposals")
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

  const handleProposalAction = async (proposalId: string, status: string) => {
    try {
      const response = await fetch(`/api/proposals/${proposalId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })

      if (response.ok) {
        toast({
          title: `Proposal ${status}`,
          description: `The proposal has been ${status}.`,
        })
        fetchProposals()
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update proposal.",
        variant: "destructive",
      })
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
        <h1 className="text-3xl font-bold">Proposals</h1>
        <p className="text-muted-foreground">Review and manage proposals for your jobs</p>
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
              <ProposalCard
                key={proposal.id}
                proposal={proposal}
                freelancer={proposal.freelancer}
                showActions
                onAccept={(id) => handleProposalAction(id, "accepted")}
                onReject={(id) => handleProposalAction(id, "rejected")}
              />
            ))
          )}
        </TabsContent>

        <TabsContent value="accepted" className="space-y-4">
          {acceptedProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} freelancer={proposal.freelancer} />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedProposals.map((proposal) => (
            <ProposalCard key={proposal.id} proposal={proposal} freelancer={proposal.freelancer} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
