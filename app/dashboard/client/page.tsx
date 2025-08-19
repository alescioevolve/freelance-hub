"use client"

import { useState } from "react"
import { Plus } from "lucide-react"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { ClientStats } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function ClientDashboard() {
  const [stats, setStats] = useState({
    totalSpent: 15000,
    activeJobs: 3,
    totalProposals: 24,
    completedJobs: 8,
  })

  const [recentJobs, setRecentJobs] = useState([
    {
      id: "1",
      title: "Build E-commerce Website",
      status: "active",
      proposals: 12,
      budget: 5000,
      createdAt: "2024-01-15",
    },
    {
      id: "2",
      title: "Mobile App UI Design",
      status: "completed",
      proposals: 8,
      budget: 2500,
      createdAt: "2024-01-10",
    },
    {
      id: "3",
      title: "Content Writing Project",
      status: "active",
      proposals: 15,
      budget: 800,
      createdAt: "2024-01-12",
    },
  ])

  const [activities] = useState([
    {
      id: "1",
      type: "proposal" as const,
      title: "New proposal received",
      description: "Sarah Johnson submitted a proposal for your e-commerce project",
      timestamp: "2 hours ago",
      status: "pending",
    },
    {
      id: "2",
      type: "payment" as const,
      title: "Payment processed",
      description: "Payment of $2,500 sent to Mike Chen for mobile app design",
      timestamp: "1 day ago",
      amount: 2500,
      status: "completed",
    },
    {
      id: "3",
      type: "message" as const,
      title: "New message",
      description: "Emma Davis sent you a message about the content project",
      timestamp: "2 days ago",
    },
  ])

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800"
      case "completed":
        return "bg-blue-100 text-blue-800"
      case "paused":
        return "bg-yellow-100 text-yellow-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your projects.</p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/jobs/create">
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <ClientStats stats={stats} />

          <div className="grid gap-8 md:grid-cols-2">
            {/* Recent Jobs */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-card-foreground">Recent Jobs</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/dashboard/client/jobs">View all</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentJobs.map((job) => (
                    <div key={job.id} className="flex items-center justify-between p-3 rounded-lg border border-border">
                      <div className="flex-1">
                        <h4 className="font-medium text-card-foreground">{job.title}</h4>
                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                          <span>{job.proposals} proposals</span>
                          <span>${job.budget.toLocaleString()}</span>
                          <span>{new Date(job.createdAt).toLocaleDateString()}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Recent Activity */}
            <RecentActivity activities={activities} />
          </div>

          {/* Quick Actions */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-3">
                <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2 border-border bg-transparent">
                  <Link href="/jobs/create">
                    <Plus className="h-6 w-6" />
                    <span>Post a Job</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2 border-border bg-transparent">
                  <Link href="/dashboard/client/proposals">
                    <Plus className="h-6 w-6" />
                    <span>Review Proposals</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2 border-border bg-transparent">
                  <Link href="/dashboard/client/messages">
                    <Plus className="h-6 w-6" />
                    <span>Check Messages</span>
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
