"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useToast } from "@/hooks/use-toast"
import type { Job } from "@/lib/types"

interface ProposalFormProps {
  job: Job
  onSuccess?: () => void
}

export function ProposalForm({ job, onSuccess }: ProposalFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const proposalData = {
      jobId: job.id,
      coverLetter: formData.get("coverLetter"),
      proposedBudget: Number(formData.get("proposedBudget")),
      deliveryTime: Number(formData.get("deliveryTime")),
    }

    try {
      const response = await fetch("/api/proposals", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(proposalData),
      })

      if (response.ok) {
        toast({
          title: "Proposal submitted!",
          description: "Your proposal has been sent to the client.",
        })
        onSuccess?.()
      } else {
        throw new Error("Failed to submit proposal")
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit proposal. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Submit Your Proposal</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <Label htmlFor="coverLetter">Cover Letter</Label>
            <Textarea
              id="coverLetter"
              name="coverLetter"
              placeholder="Explain why you're the perfect fit for this project..."
              className="min-h-32"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="proposedBudget">Your Bid ($)</Label>
              <Input
                id="proposedBudget"
                name="proposedBudget"
                type="number"
                min="1"
                placeholder="Enter your bid"
                required
              />
              <p className="text-sm text-muted-foreground mt-1">Client's budget: ${job.budget}</p>
            </div>

            <div>
              <Label htmlFor="deliveryTime">Delivery Time</Label>
              <Select name="deliveryTime" required>
                <SelectTrigger>
                  <SelectValue placeholder="Select delivery time" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">1 week</SelectItem>
                  <SelectItem value="14">2 weeks</SelectItem>
                  <SelectItem value="21">3 weeks</SelectItem>
                  <SelectItem value="30">1 month</SelectItem>
                  <SelectItem value="60">2 months</SelectItem>
                  <SelectItem value="90">3 months</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <Button type="submit" disabled={isSubmitting} className="w-full">
            {isSubmitting ? "Submitting..." : "Submit Proposal"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
