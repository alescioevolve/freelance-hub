"use client"

import { useState } from "react"
import { Search, Eye } from "lucide-react"
import Link from "next/link"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { FreelancerStats } from "@/components/dashboard/stats-cards"
import { RecentActivity } from "@/components/dashboard/recent-activity"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function FreelancerDashboard() {
  const [stats, setStats] = useState({
    totalEarnings: 25000,
    activeContracts: 2,
    pendingProposals: 5,
    completedJobs: 12,
  })

  const [recommendedJobs, setRecommendedJobs] = useState([
    {
      id: "1",
      title: "React Developer for E-commerce Platform",
      budget: 3500,
      budgetType: "fixed" as const,
      skills: ["React", "Next.js", "TypeScript"],
      postedAt: "2024-01-15",
      proposals: 8,
    },
    {
      id: "2",
      title: "Full-Stack Web Application",
      budget: 85,
      budgetType: "hourly" as const,
      skills: ["Node.js", "React", "MongoDB"],
      postedAt: "2024-01-14",
      proposals: 12,
    },
    {
      id: "3",
      title: "Mobile App Development",
      budget: 5000,
      budgetType: "fixed" as const,
      skills: ["React Native", "TypeScript", "Firebase"],
      postedAt: "2024-01-13",
      proposals: 6,
    },
  ])

  const [activities] = useState([
    {
      id: "1",
      type: "proposal" as const,
      title: "Proposal accepted",
      description: "Your proposal for the e-commerce project was accepted by John Client",
      timestamp: "3 hours ago",
      status: "accepted",
    },
    {
      id: "2",
      type: "payment" as const,
      title: "Payment received",
      description: "Received $1,500 for completed mobile app design project",
      timestamp: "1 day ago",
      amount: 1500,
      status: "completed",
    },
    {
      id: "3",
      type: "message" as const,
      title: "New message",
      description: "Client sent you a message about project requirements",
      timestamp: "2 days ago",
    },
  ])

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here are your latest opportunities and updates.</p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/dashboard/freelancer/discover">
                <Search className="mr-2 h-4 w-4" />
                Find Work
              </Link>
            </Button>
          </div>

          {/* Stats Cards */}
          <FreelancerStats stats={stats} />

          <div className="grid gap-8 md:grid-cols-2">
            {/* Recommended Jobs */}
            <Card className="bg-card border-border">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-card-foreground">Recommended for You</CardTitle>
                <Button variant="ghost" size="sm" asChild>
                  <Link href="/jobs">View all jobs</Link>
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recommendedJobs.map((job) => (
                    <div
                      key={job.id}
                      className="p-4 rounded-lg border border-border hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className="font-medium text-card-foreground line-clamp-1">{job.title}</h4>
                        <Badge variant={job.budgetType === "fixed" ? "default" : "secondary"} className="ml-2">
                          {job.budgetType === "fixed" ? "Fixed" : "Hourly"}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                        <span className="font-medium text-card-foreground">
                          ${job.budget.toLocaleString()}
                          {job.budgetType === "hourly" && "/hr"}
                        </span>
                        <span>{job.proposals} proposals</span>
                        <span>{new Date(job.postedAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex flex-wrap gap-1">
                          {job.skills.slice(0, 3).map((skill) => (
                            <Badge key={skill} variant="outline" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                        <Button size="sm" variant="ghost" asChild>
                          <Link href={`/jobs/${job.id}`}>
                            <Eye className="h-4 w-4 mr-1" />
                            View
                          </Link>
                        </Button>
                      </div>
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
                  <Link href="/jobs">
                    <Search className="h-6 w-6" />
                    <span>Browse Jobs</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2 border-border bg-transparent">
                  <Link href="/dashboard/freelancer/proposals">
                    <Eye className="h-6 w-6" />
                    <span>My Proposals</span>
                  </Link>
                </Button>
                <Button variant="outline" asChild className="h-auto p-4 flex-col gap-2 border-border bg-transparent">
                  <Link href="/dashboard/freelancer/messages">
                    <Eye className="h-6 w-6" />
                    <span>Messages</span>
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
