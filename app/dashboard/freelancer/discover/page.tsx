"use client"

import { useState } from "react"
import { DashboardSidebar } from "@/components/dashboard/sidebar"
import { JobFilters, type JobFilters as JobFiltersType } from "@/components/jobs/job-filters"
import { JobCard } from "@/components/jobs/job-card"
import { Button } from "@/components/ui/button"

export default function FreelancerDiscoverPage() {
  const [jobs] = useState([
    {
      id: "1",
      clientId: "user_2",
      title: "Build a Modern E-commerce Website",
      description:
        "I need a full-stack developer to build a modern e-commerce website using Next.js and Stripe integration. The site should have user authentication, product catalog, shopping cart, and payment processing.",
      category: "Web Development",
      budget: 5000,
      budgetType: "fixed" as const,
      skills: ["Next.js", "React", "TypeScript", "Stripe", "Tailwind CSS"],
      status: "active" as const,
      deadline: "2024-03-15T00:00:00.000Z",
      proposalCount: 3,
      createdAt: "2024-01-15T00:00:00.000Z",
      updatedAt: "2024-01-15T00:00:00.000Z",
      client: {
        name: "John Client",
        location: "United States",
        rating: 4.8,
        jobsPosted: 5,
      },
    },
    {
      id: "2",
      clientId: "user_2",
      title: "Mobile App UI/UX Design",
      description:
        "Looking for a talented UI/UX designer to create mockups and prototypes for a mobile fitness app. Need modern, clean design with excellent user experience.",
      category: "Design",
      budget: 75,
      budgetType: "hourly" as const,
      skills: ["Figma", "UI/UX Design", "Mobile Design", "Prototyping"],
      status: "active" as const,
      proposalCount: 7,
      createdAt: "2024-01-20T00:00:00.000Z",
      updatedAt: "2024-01-20T00:00:00.000Z",
      client: {
        name: "John Client",
        location: "United States",
        rating: 4.8,
        jobsPosted: 5,
      },
    },
  ])

  const [filteredJobs, setFilteredJobs] = useState(jobs)
  const [currentPage, setCurrentPage] = useState(1)
  const jobsPerPage = 12

  const handleFiltersChange = (filters: JobFiltersType) => {
    let filtered = [...jobs]

    // Apply filters (same logic as in jobs page)
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      filtered = filtered.filter(
        (job) =>
          job.title.toLowerCase().includes(searchLower) ||
          job.description.toLowerCase().includes(searchLower) ||
          job.skills.some((skill) => skill.toLowerCase().includes(searchLower)),
      )
    }

    if (filters.category && filters.category !== "All categories") {
      filtered = filtered.filter((job) => job.category === filters.category)
    }

    if (filters.budgetType && filters.budgetType !== "Any budget type") {
      filtered = filtered.filter((job) => job.budgetType === filters.budgetType)
    }

    if (filters.minBudget > 0) {
      filtered = filtered.filter((job) => job.budget >= filters.minBudget)
    }
    if (filters.maxBudget < 10000) {
      filtered = filtered.filter((job) => job.budget <= filters.maxBudget)
    }

    if (filters.skills.length > 0) {
      filtered = filtered.filter((job) => filters.skills.some((skill) => job.skills.includes(skill)))
    }

    setFilteredJobs(filtered)
    setCurrentPage(1)
  }

  const paginatedJobs = filteredJobs.slice((currentPage - 1) * jobsPerPage, currentPage * jobsPerPage)
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage)

  return (
    <div className="min-h-screen bg-background">
      <DashboardSidebar />
      <main className="md:ml-64 p-4 md:p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          {/* Header */}
          <div>
            <h1 className="text-3xl font-bold text-foreground mb-2">Find Work</h1>
            <p className="text-muted-foreground">Discover opportunities that match your skills and interests</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="lg:col-span-1">
              <JobFilters onFiltersChange={handleFiltersChange} />
            </div>

            {/* Jobs Grid */}
            <div className="lg:col-span-3">
              {paginatedJobs.length === 0 ? (
                <div className="text-center py-12">
                  <p className="text-muted-foreground text-lg">No jobs found matching your criteria.</p>
                  <p className="text-muted-foreground">Try adjusting your filters or search terms.</p>
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    {paginatedJobs.map((job) => (
                      <JobCard key={job.id} job={job} />
                    ))}
                  </div>

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center gap-2">
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(currentPage - 1)}
                        disabled={currentPage === 1}
                      >
                        Previous
                      </Button>
                      <span className="flex items-center px-4 text-sm text-muted-foreground">
                        Page {currentPage} of {totalPages}
                      </span>
                      <Button
                        variant="outline"
                        onClick={() => setCurrentPage(currentPage + 1)}
                        disabled={currentPage === totalPages}
                      >
                        Next
                      </Button>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
