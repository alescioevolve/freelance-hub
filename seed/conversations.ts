import type { Conversation } from "@/lib/types"

export const mockConversations: Conversation[] = [
  {
    id: "conversation_1",
    participants: ["user_1", "user_3"],
    lastMessage:
      "Hi! I'm interested in your web development project. I have extensive experience with Next.js and would love to discuss the details.",
    lastMessageAt: "2024-01-16T10:30:00.000Z",
    createdAt: "2024-01-16T10:00:00.000Z",
    updatedAt: "2024-01-16T10:30:00.000Z",
    otherParty: {
      id: "user_3",
      email: "alex.developer@example.com",
      name: "Alex Developer",
      role: "freelancer",
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2024-01-15T00:00:00.000Z",
      updatedAt: "2024-01-15T00:00:00.000Z",
    },
    unreadCount: 2,
  },
  {
    id: "conversation_2",
    participants: ["user_2", "user_4"],
    lastMessage: "Thank you for your proposal! I'd like to schedule a call to discuss the project timeline.",
    lastMessageAt: "2024-01-15T16:45:00.000Z",
    createdAt: "2024-01-15T14:00:00.000Z",
    updatedAt: "2024-01-15T16:45:00.000Z",
    otherParty: {
      id: "user_4",
      email: "sarah.designer@example.com",
      name: "Sarah Designer",
      role: "freelancer",
      avatar: "/placeholder.svg?height=40&width=40",
      createdAt: "2024-01-14T00:00:00.000Z",
      updatedAt: "2024-01-14T00:00:00.000Z",
    },
    unreadCount: 0,
  },
]
