import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Calendar, DollarSign, User } from "lucide-react"
import type { Contract, Job, User as UserType } from "@/lib/types"

interface ContractCardProps {
  contract: Contract
  job: Job
  otherParty: UserType
  userRole: "client" | "freelancer"
}

export function ContractCard({ contract, job, otherParty, userRole }: ContractCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "cancelled":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  const progress = (contract.paidAmount / contract.totalAmount) * 100

  return (
    <Card>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-lg">{job.title}</CardTitle>
            <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
              <User className="h-4 w-4" />
              <span>
                {userRole === "client" ? "Freelancer" : "Client"}: {otherParty.name}
              </span>
            </div>
          </div>
          <Badge className={getStatusColor(contract.status)}>{contract.status}</Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="flex items-center gap-2">
            <DollarSign className="h-4 w-4" />
            <span>
              ${contract.paidAmount} / ${contract.totalAmount}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span>Due: {new Date(contract.deadline).toLocaleDateString()}</span>
          </div>
        </div>

        <div>
          <div className="flex justify-between text-sm mb-2">
            <span>Progress</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        <div className="flex gap-2">
          <Button size="sm" variant="outline" className="flex-1 bg-transparent">
            View Details
          </Button>
          {contract.status === "active" && (
            <Button size="sm" className="flex-1">
              {userRole === "client" ? "Release Payment" : "Submit Work"}
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
