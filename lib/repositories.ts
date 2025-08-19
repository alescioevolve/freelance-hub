import { mockUsers, mockProfiles } from "@/seed/users"
import { mockJobs } from "@/seed/jobs"
import { mockProposals } from "@/seed/proposals"
import { mockMessages } from "@/seed/messages"
import { mockConversations } from "@/seed/conversations"
import { mockContracts } from "@/seed/contracts"
import type { User, Profile, Job, Proposal, Message, Conversation, Contract } from "./types"

// Mock repository pattern - replace with real DB calls later
export class UserRepository {
  static findById(id: string): User | undefined {
    return mockUsers.find((user) => user.id === id)
  }

  static findByEmail(email: string): User | undefined {
    return mockUsers.find((user) => user.email === email)
  }

  static create(userData: Omit<User, "id" | "createdAt" | "updatedAt">): User {
    const user: User = {
      ...userData,
      id: `user_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockUsers.push(user)
    return user
  }
}

export class ProfileRepository {
  static findByUserId(userId: string): Profile | undefined {
    return mockProfiles.find((profile) => profile.userId === userId)
  }

  static create(profileData: Omit<Profile, "id" | "createdAt" | "updatedAt">): Profile {
    const profile: Profile = {
      ...profileData,
      id: `profile_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockProfiles.push(profile)
    return profile
  }
}

export class JobRepository {
  static findAll(): Job[] {
    return mockJobs.filter((job) => job.status === "active")
  }

  static findById(id: string): Job | undefined {
    return mockJobs.find((job) => job.id === id)
  }

  static findByClientId(clientId: string): Job[] {
    return mockJobs.filter((job) => job.clientId === clientId)
  }

  static create(jobData: Omit<Job, "id" | "proposalCount" | "createdAt" | "updatedAt">): Job {
    const job: Job = {
      ...jobData,
      id: `job_${Date.now()}`,
      proposalCount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockJobs.push(job)
    return job
  }
}

export class ProposalRepository {
  static findAll(): Proposal[] {
    return mockProposals
  }

  static findByJobId(jobId: string): Proposal[] {
    return mockProposals.filter((proposal) => proposal.jobId === jobId)
  }

  static findByFreelancerId(freelancerId: string): Proposal[] {
    return mockProposals.filter((proposal) => proposal.freelancerId === freelancerId)
  }

  static create(proposalData: Omit<Proposal, "id" | "createdAt" | "updatedAt">): Proposal {
    const proposal: Proposal = {
      ...proposalData,
      id: `proposal_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockProposals.push(proposal)
    return proposal
  }

  static updateStatus(id: string, status: string): Proposal {
    const proposalIndex = mockProposals.findIndex((p) => p.id === id)
    if (proposalIndex !== -1) {
      mockProposals[proposalIndex] = {
        ...mockProposals[proposalIndex],
        status,
        updatedAt: new Date().toISOString(),
      }
      return mockProposals[proposalIndex]
    }
    throw new Error("Proposal not found")
  }
}

export class ContractRepository {
  static findAll(): Contract[] {
    return mockContracts
  }

  static findByClientId(clientId: string): Contract[] {
    return mockContracts.filter((contract) => contract.clientId === clientId)
  }

  static findByFreelancerId(freelancerId: string): Contract[] {
    return mockContracts.filter((contract) => contract.freelancerId === freelancerId)
  }

  static create(contractData: Omit<Contract, "id" | "paidAmount" | "createdAt" | "updatedAt">): Contract {
    const contract: Contract = {
      ...contractData,
      id: `contract_${Date.now()}`,
      paidAmount: 0,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockContracts.push(contract)
    return contract
  }
}

export class MessageRepository {
  static findByConversationId(conversationId: string): Message[] {
    return mockMessages.filter((message) => message.conversationId === conversationId)
  }

  static create(messageData: Omit<Message, "id" | "createdAt" | "updatedAt">): Message {
    const message: Message = {
      ...messageData,
      id: `message_${Date.now()}`,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }
    mockMessages.push(message)
    return message
  }
}

export class ConversationRepository {
  static findByUserId(userId: string): Conversation[] {
    return mockConversations
      .filter((conv) => conv.participants.includes(userId))
      .map((conv) => ({
        ...conv,
        otherParty: mockUsers.find((user) => conv.participants.find((p) => p !== userId) === user.id)!,
        unreadCount: 0, // Mock unread count
      }))
  }

  static create(conversationData: { participants: string[]; initialMessage: string; createdBy: string }): Conversation {
    const conversation: Conversation = {
      id: `conversation_${Date.now()}`,
      participants: conversationData.participants,
      lastMessage: conversationData.initialMessage,
      lastMessageAt: new Date().toISOString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      otherParty: mockUsers.find(
        (user) => conversationData.participants.find((p) => p !== conversationData.createdBy) === user.id,
      )!,
      unreadCount: 0,
    }
    mockConversations.push(conversation)
    return conversation
  }
}

export const userRepository = UserRepository
export const profileRepository = ProfileRepository
export const jobRepository = JobRepository
export const proposalRepository = ProposalRepository
export const contractRepository = ContractRepository
export const messageRepository = MessageRepository
export const conversationRepository = ConversationRepository
