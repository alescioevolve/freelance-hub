"use client"

import { useState } from "react"
import { Search, Filter, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface JobFiltersProps {
  onFiltersChange: (filters: JobFilters) => void
}

export interface JobFilters {
  search: string
  category: string
  budgetType: string
  minBudget: number
  maxBudget: number
  skills: string[]
}

const categories = [
  "Web Development",
  "Mobile Development",
  "Design",
  "Writing & Translation",
  "Digital Marketing",
  "Video & Animation",
  "Music & Audio",
  "Business",
  "AI Services",
  "Photography",
]

const popularSkills = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "Python",
  "Figma",
  "Photoshop",
  "WordPress",
  "SEO",
  "Content Writing",
]

export function JobFilters({ onFiltersChange }: JobFiltersProps) {
  const [filters, setFilters] = useState<JobFilters>({
    search: "",
    category: "All categories",
    budgetType: "Any budget type",
    minBudget: 0,
    maxBudget: 10000,
    skills: [],
  })

  const [showAdvanced, setShowAdvanced] = useState(false)

  const updateFilters = (newFilters: Partial<JobFilters>) => {
    const updated = { ...filters, ...newFilters }
    setFilters(updated)
    onFiltersChange(updated)
  }

  const addSkill = (skill: string) => {
    if (!filters.skills.includes(skill)) {
      updateFilters({ skills: [...filters.skills, skill] })
    }
  }

  const removeSkill = (skill: string) => {
    updateFilters({ skills: filters.skills.filter((s) => s !== skill) })
  }

  const clearFilters = () => {
    const clearedFilters: JobFilters = {
      search: "",
      category: "All categories",
      budgetType: "Any budget type",
      minBudget: 0,
      maxBudget: 10000,
      skills: [],
    }
    setFilters(clearedFilters)
    onFiltersChange(clearedFilters)
  }

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="Search jobs..."
              value={filters.search}
              onChange={(e) => updateFilters({ search: e.target.value })}
              className="pl-10 bg-input border-border"
            />
          </div>

          {/* Category and Budget Type */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select value={filters.category} onValueChange={(value) => updateFilters({ category: value })}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="All categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="All categories">All categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={filters.budgetType} onValueChange={(value) => updateFilters({ budgetType: value })}>
              <SelectTrigger className="bg-input border-border">
                <SelectValue placeholder="Budget type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Any budget type">Any budget type</SelectItem>
                <SelectItem value="fixed">Fixed price</SelectItem>
                <SelectItem value="hourly">Hourly rate</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Advanced Filters Toggle */}
          <Button
            variant="ghost"
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="w-full justify-center text-muted-foreground hover:text-foreground"
          >
            <Filter className="mr-2 h-4 w-4" />
            {showAdvanced ? "Hide" : "Show"} advanced filters
          </Button>

          {/* Advanced Filters */}
          {showAdvanced && (
            <div className="space-y-4 pt-4 border-t border-border">
              {/* Budget Range */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Budget Range</label>
                <div className="grid grid-cols-2 gap-2">
                  <Input
                    type="number"
                    placeholder="Min"
                    value={filters.minBudget || ""}
                    onChange={(e) => updateFilters({ minBudget: Number(e.target.value) || 0 })}
                    className="bg-input border-border"
                  />
                  <Input
                    type="number"
                    placeholder="Max"
                    value={filters.maxBudget || ""}
                    onChange={(e) => updateFilters({ maxBudget: Number(e.target.value) || 10000 })}
                    className="bg-input border-border"
                  />
                </div>
              </div>

              {/* Skills */}
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">Skills</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {popularSkills.map((skill) => (
                    <Button
                      key={skill}
                      variant={filters.skills.includes(skill) ? "default" : "outline"}
                      size="sm"
                      onClick={() => (filters.skills.includes(skill) ? removeSkill(skill) : addSkill(skill))}
                      className="text-xs"
                    >
                      {skill}
                    </Button>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Active Filters */}
          {(filters.skills.length > 0 ||
            filters.category !== "All categories" ||
            filters.budgetType !== "Any budget type") && (
            <div className="flex flex-wrap gap-2 pt-4 border-t border-border">
              {filters.category !== "All categories" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.category}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => updateFilters({ category: "All categories" })} />
                </Badge>
              )}
              {filters.budgetType !== "Any budget type" && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  {filters.budgetType === "fixed" ? "Fixed price" : "Hourly rate"}
                  <X
                    className="h-3 w-3 cursor-pointer"
                    onClick={() => updateFilters({ budgetType: "Any budget type" })}
                  />
                </Badge>
              )}
              {filters.skills.map((skill) => (
                <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                  {skill}
                  <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                </Badge>
              ))}
              <Button variant="ghost" size="sm" onClick={clearFilters} className="text-muted-foreground">
                Clear all
              </Button>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
