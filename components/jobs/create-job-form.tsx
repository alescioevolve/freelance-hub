"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import type { z } from "zod"
import { Loader2, Plus, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Badge } from "@/components/ui/badge"
import { useToast } from "@/hooks/use-toast"
import { jobSchema } from "@/lib/validators"

type JobFormData = z.infer<typeof jobSchema>

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

export function CreateJobForm() {
  const [isLoading, setIsLoading] = useState(false)
  const [selectedSkills, setSelectedSkills] = useState<string[]>([])
  const [customSkill, setCustomSkill] = useState("")
  const router = useRouter()
  const { toast } = useToast()

  const form = useForm<JobFormData>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: "",
      description: "",
      category: "",
      budget: 0,
      budgetType: "fixed",
      skills: [],
      deadline: "",
    },
  })

  const addSkill = (skill: string) => {
    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill]
      setSelectedSkills(newSkills)
      form.setValue("skills", newSkills)
    }
  }

  const removeSkill = (skill: string) => {
    const newSkills = selectedSkills.filter((s) => s !== skill)
    setSelectedSkills(newSkills)
    form.setValue("skills", newSkills)
  }

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      addSkill(customSkill.trim())
      setCustomSkill("")
    }
  }

  async function onSubmit(data: JobFormData) {
    setIsLoading(true)

    try {
      const response = await fetch("/api/jobs", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...data, skills: selectedSkills }),
      })

      if (response.ok) {
        const job = await response.json()
        toast({
          title: "Job posted successfully!",
          description: "Your job has been posted and is now visible to freelancers.",
        })
        router.push(`/jobs/${job.id}`)
      } else {
        const error = await response.json()
        toast({
          title: "Failed to post job",
          description: error.message || "Something went wrong. Please try again.",
          variant: "destructive",
        })
      }
    } catch (error) {
      toast({
        title: "Something went wrong",
        description: "Please try again later.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="max-w-4xl mx-auto bg-card border-border">
      <CardHeader>
        <CardTitle className="text-2xl text-card-foreground">Post a New Job</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Title */}
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-card-foreground">Job Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="e.g., Build a modern e-commerce website"
                      className="bg-input border-border"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Category and Budget Type */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground">Category</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="budgetType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground">Budget Type</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-input border-border">
                          <SelectValue />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="fixed">Fixed Price</SelectItem>
                        <SelectItem value="hourly">Hourly Rate</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Budget and Deadline */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground">
                      Budget ({form.watch("budgetType") === "hourly" ? "per hour" : "total"})
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="number"
                        placeholder="0"
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="bg-input border-border"
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="deadline"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-card-foreground">Deadline (Optional)</FormLabel>
                    <FormControl>
                      <Input {...field} type="date" className="bg-input border-border" disabled={isLoading} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            {/* Description */}
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-card-foreground">Job Description</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your project in detail..."
                      rows={6}
                      className="bg-input border-border resize-none"
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Skills */}
            <div>
              <FormLabel className="text-card-foreground">Required Skills</FormLabel>
              <div className="mt-2 space-y-4">
                {/* Popular Skills */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Popular skills:</p>
                  <div className="flex flex-wrap gap-2">
                    {popularSkills.map((skill) => (
                      <Button
                        key={skill}
                        type="button"
                        variant={selectedSkills.includes(skill) ? "default" : "outline"}
                        size="sm"
                        onClick={() => (selectedSkills.includes(skill) ? removeSkill(skill) : addSkill(skill))}
                        disabled={isLoading}
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Custom Skill Input */}
                <div>
                  <p className="text-sm text-muted-foreground mb-2">Add custom skill:</p>
                  <div className="flex gap-2">
                    <Input
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      placeholder="Enter skill name"
                      className="bg-input border-border"
                      disabled={isLoading}
                      onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addCustomSkill())}
                    />
                    <Button type="button" onClick={addCustomSkill} disabled={isLoading || !customSkill.trim()}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                {/* Selected Skills */}
                {selectedSkills.length > 0 && (
                  <div>
                    <p className="text-sm text-muted-foreground mb-2">Selected skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill) => (
                        <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                          {skill}
                          <X className="h-3 w-3 cursor-pointer" onClick={() => removeSkill(skill)} />
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Post Job
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}
