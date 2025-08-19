import type React from "react"
import { TrendingUp, TrendingDown, DollarSign, Briefcase, FileText, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface StatsCardProps {
  title: string
  value: string | number
  change?: {
    value: number
    type: "increase" | "decrease"
  }
  icon: React.ComponentType<{ className?: string }>
}

function StatsCard({ title, value, change, icon: Icon }: StatsCardProps) {
  return (
    <Card className="bg-card border-border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-card-foreground">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-card-foreground">{value}</div>
        {change && (
          <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
            {change.type === "increase" ? (
              <TrendingUp className="h-3 w-3 text-green-500" />
            ) : (
              <TrendingDown className="h-3 w-3 text-red-500" />
            )}
            <span className={change.type === "increase" ? "text-green-500" : "text-red-500"}>
              {change.value > 0 ? "+" : ""}
              {change.value}%
            </span>
            <span>from last month</span>
          </p>
        )}
      </CardContent>
    </Card>
  )
}

interface ClientStatsProps {
  stats: {
    totalSpent: number
    activeJobs: number
    totalProposals: number
    completedJobs: number
  }
}

export function ClientStats({ stats }: ClientStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Spent"
        value={`$${stats.totalSpent.toLocaleString()}`}
        change={{ value: 12, type: "increase" }}
        icon={DollarSign}
      />
      <StatsCard
        title="Active Jobs"
        value={stats.activeJobs}
        change={{ value: 5, type: "increase" }}
        icon={Briefcase}
      />
      <StatsCard
        title="Total Proposals"
        value={stats.totalProposals}
        change={{ value: 8, type: "increase" }}
        icon={FileText}
      />
      <StatsCard
        title="Completed Jobs"
        value={stats.completedJobs}
        change={{ value: 15, type: "increase" }}
        icon={Users}
      />
    </div>
  )
}

interface FreelancerStatsProps {
  stats: {
    totalEarnings: number
    activeContracts: number
    pendingProposals: number
    completedJobs: number
  }
}

export function FreelancerStats({ stats }: FreelancerStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Total Earnings"
        value={`$${stats.totalEarnings.toLocaleString()}`}
        change={{ value: 18, type: "increase" }}
        icon={DollarSign}
      />
      <StatsCard
        title="Active Contracts"
        value={stats.activeContracts}
        change={{ value: 3, type: "increase" }}
        icon={Briefcase}
      />
      <StatsCard
        title="Pending Proposals"
        value={stats.pendingProposals}
        change={{ value: -2, type: "decrease" }}
        icon={FileText}
      />
      <StatsCard
        title="Completed Jobs"
        value={stats.completedJobs}
        change={{ value: 22, type: "increase" }}
        icon={Users}
      />
    </div>
  )
}
