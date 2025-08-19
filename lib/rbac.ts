import type { UserRole } from "./types"

export const permissions = {
  // Job permissions
  "job:create": ["client"],
  "job:edit": ["client"],
  "job:delete": ["client"],
  "job:view": ["client", "freelancer", "admin"],

  // Proposal permissions
  "proposal:create": ["freelancer"],
  "proposal:view": ["client", "freelancer", "admin"],
  "proposal:accept": ["client"],
  "proposal:decline": ["client"],

  // Contract permissions
  "contract:view": ["client", "freelancer", "admin"],
  "contract:complete": ["client", "freelancer"],

  // Admin permissions
  "user:ban": ["admin"],
  "user:unban": ["admin"],
  "dispute:resolve": ["admin"],

  // Messaging permissions
  "message:send": ["client", "freelancer"],
  "message:view": ["client", "freelancer", "admin"],
} as const

export function hasPermission(userRole: UserRole, permission: keyof typeof permissions): boolean {
  return permissions[permission].includes(userRole)
}

export function canAccessResource(userRole: UserRole, resourceOwnerId: string, userId: string): boolean {
  // Admin can access everything
  if (userRole === "admin") return true

  // Users can access their own resources
  return resourceOwnerId === userId
}
