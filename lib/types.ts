// Core data types for the freelance marketplace
export type UserRole = "client" | "freelancer" | "admin"

export type JobStatus = "draft" | "active" | "paused" | "completed" | "cancelled"
export type ProposalStatus = "pending" | "accepted" | "declined" | "withdrawn"
export type ContractStatus = "active" | "completed" | "cancelled" | "disputed"
export type DisputeStatus = "open" | "in_review" | "resolved" | "closed"
export type MessageType = "text" | "file" | "system"

export interface User {
  id: string
  email: string
  password: string
  role: UserRole
  isActive: boolean
  createdAt: string
  updatedAt: string
}

export interface Profile {
  id: string
  userId: string
  firstName: string
  lastName: string
  avatar?: string
  bio?: string
  skills: string[]
  hourlyRate?: number
  location?: string
  timezone?: string
  rating: number
  totalEarnings: number
  completedJobs: number
  createdAt: string
  updatedAt: string
}

export interface Job {
  id: string
  clientId: string
  title: string
  description: string
  category: string
  budget: number
  budgetType: "fixed" | "hourly"
  skills: string[]
  status: JobStatus
  deadline?: string
  proposalCount: number
  createdAt: string
  updatedAt: string
}

export interface Proposal {
  id: string
  jobId: string
  freelancerId: string
  coverLetter: string
  proposedBudget: number
  deliveryTime: number
  status: ProposalStatus
  createdAt: string
  updatedAt: string
}

export interface Contract {
  id: string
  jobId: string
  proposalId: string
  clientId: string
  freelancerId: string
  budget: number
  status: ContractStatus
  startDate: string
  endDate?: string
  createdAt: string
  updatedAt: string
}

export interface Message {
  id: string
  threadId: string
  senderId: string
  content: string
  type: MessageType
  createdAt: string
}

export interface Review {
  id: string
  contractId: string
  reviewerId: string
  revieweeId: string
  rating: number
  comment: string
  createdAt: string
}

export interface Dispute {
  id: string
  contractId: string
  raisedBy: string
  reason: string
  description: string
  status: DisputeStatus
  resolution?: string
  createdAt: string
  updatedAt: string
}
