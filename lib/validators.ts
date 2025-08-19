import { z } from "zod"

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

export const registerSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  role: z.enum(["client", "freelancer"]),
})

export const jobSchema = z.object({
  title: z.string().min(10, "Title must be at least 10 characters"),
  description: z.string().min(50, "Description must be at least 50 characters"),
  category: z.string().min(1, "Category is required"),
  budget: z.number().min(1, "Budget must be greater than 0"),
  budgetType: z.enum(["fixed", "hourly"]),
  skills: z.array(z.string()).min(1, "At least one skill is required"),
  deadline: z.string().optional(),
})

export const proposalSchema = z.object({
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  proposedBudget: z.number().min(1, "Budget must be greater than 0"),
  deliveryTime: z.number().min(1, "Delivery time must be at least 1 day"),
})

export const createProposalSchema = z.object({
  jobId: z.string().min(1, "Job ID is required"),
  coverLetter: z.string().min(50, "Cover letter must be at least 50 characters"),
  proposedBudget: z.number().min(1, "Budget must be greater than 0"),
  deliveryTime: z.number().min(1, "Delivery time must be at least 1 day"),
})

export const messageSchema = z.object({
  content: z.string().min(1, "Message cannot be empty"),
  threadId: z.string(),
})

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  comment: z.string().min(10, "Review must be at least 10 characters"),
})
