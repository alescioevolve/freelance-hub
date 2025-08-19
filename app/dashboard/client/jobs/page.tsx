"use client"

import { useState } from "react"
import Link from "next/link"
import { Plus, Eye, Edit, Trash2, MoreHorizontal } from "lucide-react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"

export default function ClientJobsPage() {
  const [jobs] = useState([
    {
      id: "1",
      title: "Build Modern E-commerce Website",
      status: "active",
      budget: 5000,
      budgetType: "fixed",
      proposals: 12,
      createdAt: "2024-01-15",
      category: "Web Development",
    },
    {
      id: "2",
      title: "Mobile App UI/UX Design",
      status: "completed",
      budget: 2500,
      budgetType: "fixed",
      proposals: 8,
      createdAt: "2024-01-10",
      category: "Design",
    },
    {
      id: "3",
      title: "Content Writing for Blog",
      status: "active",
      budget: 50,
      budgetType: "hourly",
      proposals: 15,
      createdAt: "2024-01-12",
      category: "Writing & Translation",
    },
    {
      id: "4",
      title: "SEO Optimization Project",
      status: "paused",
      budget: 1200,
      budgetType: "fixed",
      proposals: 6,
      createdAt: "2024-01-08",
      category: "Digital Marketing",
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
      case "draft":
        return "bg-gray-100 text-gray-800"
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
              <h1 className="text-3xl font-bold text-foreground">My Jobs</h1>
              <p className="text-muted-foreground">Manage all your posted jobs and track their progress.</p>
            </div>
            <Button asChild className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Link href="/jobs/create">
                <Plus className="mr-2 h-4 w-4" />
                Post New Job
              </Link>
            </Button>
          </div>

          {/* Jobs Table */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-card-foreground">All Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-border">
                    <TableHead className="text-muted-foreground">Job Title</TableHead>
                    <TableHead className="text-muted-foreground">Category</TableHead>
                    <TableHead className="text-muted-foreground">Budget</TableHead>
                    <TableHead className="text-muted-foreground">Proposals</TableHead>
                    <TableHead className="text-muted-foreground">Status</TableHead>
                    <TableHead className="text-muted-foreground">Posted</TableHead>
                    <TableHead className="text-muted-foreground">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {jobs.map((job) => (
                    <TableRow key={job.id} className="border-border">
                      <TableCell>
                        <div>
                          <Link
                            href={`/jobs/${job.id}`}
                            className="font-medium text-card-foreground hover:text-primary transition-colors"
                          >
                            {job.title}
                          </Link>
                        </div>
                      </TableCell>
                      <TableCell className="text-muted-foreground">{job.category}</TableCell>
                      <TableCell className="text-card-foreground">
                        ${job.budget.toLocaleString()}
                        {job.budgetType === "hourly" && "/hr"}
                      </TableCell>
                      <TableCell className="text-card-foreground">{job.proposals}</TableCell>
                      <TableCell>
                        <Badge className={getStatusColor(job.status)}>{job.status}</Badge>
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(job.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="sm">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem asChild>
                              <Link href={`/jobs/${job.id}`} className="flex items-center">
                                <Eye className="mr-2 h-4 w-4" />
                                View Details
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild>
                              <Link href={`/jobs/${job.id}/edit`} className="flex items-center">
                                <Edit className="mr-2 h-4 w-4" />
                                Edit Job
                              </Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-destructive">
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete Job
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
