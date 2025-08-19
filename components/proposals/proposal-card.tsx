"use client"

import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star, Clock, DollarSign } from "lucide-react"
import type { Proposal, User } from "@/lib/types"

interface ProposalCardProps {
  proposal: Proposal
  freelancer: User
  onAccept?: (proposalId: string) => void
  onReject?: (proposalId: string) => void
  showActions?: boolean
}

export function ProposalCard({ proposal, freelancer, onAccept, onReject, showActions = false }: ProposalCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "accepted":
        return "bg-green-100 text-green-800"
      case "rejected":
        return "bg-red-100 text-red-800"
      default:
        return "bg-yellow-100 text-yellow-800"
    }
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <Avatar>
              <AvatarImage src={freelancer.avatar || "/placeholder.svg"} />
              <AvatarFallback>{freelancer.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold">{freelancer.name}</h3>
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span>4.9 (127 reviews)</span>
              </div>
            </div>
          </div>
          <Badge className={getStatusColor(proposal.status)}>{proposal.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm">{proposal.coverLetter}</p>

        <div className="flex items-center gap-6 text-sm">
          <div className="flex items-center gap-1">
            <DollarSign className="h-4 w-4" />
            <span className="font-semibold">${proposal.proposedBudget}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{proposal.deliveryTime} days</span>
          </div>
        </div>

        {showActions && proposal.status === "pending" && (
          <div className="flex gap-2 pt-2">
            <Button size="sm" onClick={() => onAccept?.(proposal.id)} className="flex-1">
              Accept
            </Button>
            <Button size="sm" variant="outline" onClick={() => onReject?.(proposal.id)} className="flex-1">
              Decline
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
