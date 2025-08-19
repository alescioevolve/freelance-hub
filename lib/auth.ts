import NextAuth from "next-auth"
import bcrypt from "bcryptjs"
import { mockUsers } from "@/seed/users"

const SimpleCredentialsProvider = {
  id: "credentials",
  name: "credentials",
  type: "credentials",
  credentials: {
    email: { label: "Email", type: "email" },
    password: { label: "Password", type: "password" },
  },
  async authorize(credentials: any) {
    if (!credentials?.email || !credentials?.password) {
      return null
    }

    const user = mockUsers.find((u) => u.email === credentials.email)
    if (!user || !user.isActive) {
      return null
    }

    const isPasswordValid = await bcrypt.compare(credentials.password, user.password)
    if (!isPasswordValid) {
      return null
    }

    return {
      id: user.id,
      email: user.email,
      role: user.role,
    }
  },
}

export const authOptions = {
  providers: [SimpleCredentialsProvider],
  session: {
    strategy: "jwt" as const,
  },
  callbacks: {
    async jwt({ token, user }: any) {
      if (user) {
        token.role = user.role
      }
      return token
    },
    async session({ session, token }: any) {
      if (token) {
        session.user.id = token.sub!
        session.user.role = token.role as string
      }
      return session
    },
  },
  pages: {
    signIn: "/login",
  },
}

const handler = NextAuth(authOptions)

export const auth = handler.auth
export const signIn = handler.signIn
export const signOut = handler.signOut

export const handlers = { GET: handler, POST: handler }
export { handler as GET, handler as POST }
