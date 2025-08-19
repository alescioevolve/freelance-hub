import Link from "next/link"
import { Clock, DollarSign, MapPin, Users } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import type { Job } from "@/lib/types"

interface JobCardProps {
  job: Job & {
    client?: {
      name: string
      location?: string
      rating: number
      jobsPosted: number
    }
  }
}

export function JobCard({ job }: JobCardProps) {
  const timeAgo = new Date(job.createdAt).toLocaleDateString()

  return (
    <Card className="bg-card border-border hover:shadow-md transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <Link href={`/jobs/${job.id}`}>
              <h3 className="text-lg font-semibold text-card-foreground hover:text-primary transition-colors line-clamp-2">
                {job.title}
              </h3>
            </Link>
            <p className="text-sm text-muted-foreground mt-1">Posted {timeAgo}</p>
          </div>
          <Badge variant={job.budgetType === "fixed" ? "default" : "secondary"} className="ml-2">
            {job.budgetType === "fixed" ? "Fixed" : "Hourly"}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-card-foreground line-clamp-3">{job.description}</p>

        {/* Budget */}
        <div className="flex items-center gap-2 text-sm">
          <DollarSign className="h-4 w-4 text-muted-foreground" />
          <span className="font-semibold text-card-foreground">
            ${job.budget.toLocaleString()}
            {job.budgetType === "hourly" && "/hr"}
          </span>
        </div>

        {/* Skills */}
        <div className="flex flex-wrap gap-1">
          {job.skills.slice(0, 4).map((skill) => (
            <Badge key={skill} variant="outline" className="text-xs">
              {skill}
            </Badge>
          ))}
          {job.skills.length > 4 && (
            <Badge variant="outline" className="text-xs">
              +{job.skills.length - 4} more
            </Badge>
          )}
        </div>

        {/* Client Info */}
        {job.client && (
          <div className="flex items-center justify-between pt-2 border-t border-border">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{job.client.name}</span>
              {job.client.location && (
                <>
                  <MapPin className="h-3 w-3" />
                  <span>{job.client.location}</span>
                </>
              )}
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Users className="h-4 w-4" />
              <span>{job.proposalCount} proposals</span>
            </div>
          </div>
        )}

        {/* Deadline */}
        {job.deadline && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="h-4 w-4" />
            <span>Deadline: {new Date(job.deadline).toLocaleDateString()}</span>
          </div>
        )}

        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground">
          <Link href={`/jobs/${job.id}`}>View Details</Link>
        </Button>
      </CardContent>
    </Card>
  )
}
