"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useSession, signOut } from "next-auth/react"
import {
  LayoutDashboard,
  Briefcase,
  FileText,
  MessageSquare,
  DollarSign,
  Settings,
  LogOut,
  Menu,
  X,
  User,
  Search,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const clientNavItems = [
  { href: "/dashboard/client", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/client/jobs", label: "My Jobs", icon: Briefcase },
  { href: "/dashboard/client/proposals", label: "Proposals", icon: FileText },
  { href: "/dashboard/client/contracts", label: "Contracts", icon: FileText },
  { href: "/dashboard/client/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/client/payments", label: "Payments", icon: DollarSign },
]

const freelancerNavItems = [
  { href: "/dashboard/freelancer", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/freelancer/discover", label: "Find Work", icon: Search },
  { href: "/dashboard/freelancer/proposals", label: "My Proposals", icon: FileText },
  { href: "/dashboard/freelancer/contracts", label: "Contracts", icon: FileText },
  { href: "/dashboard/freelancer/messages", label: "Messages", icon: MessageSquare },
  { href: "/dashboard/freelancer/earnings", label: "Earnings", icon: DollarSign },
]

export function DashboardSidebar() {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const { data: session } = useSession()

  const navItems = session?.user.role === "client" ? clientNavItems : freelancerNavItems

  const handleSignOut = () => {
    signOut({ callbackUrl: "/" })
  }

  return (
    <>
      {/* Mobile Menu Button */}
      <Button
        variant="ghost"
        size="sm"
        className="fixed top-4 left-4 z-50 md:hidden bg-background border border-border"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {/* Sidebar */}
      <aside
        className={cn(
          "fixed left-0 top-0 z-40 h-full w-64 bg-sidebar border-r border-sidebar-border transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Logo */}
          <div className="flex items-center gap-2 p-6 border-b border-sidebar-border">
            <div className="w-8 h-8 bg-sidebar-primary rounded-lg flex items-center justify-center">
              <span className="text-sidebar-primary-foreground font-bold text-lg">F</span>
            </div>
            <span className="text-xl font-bold text-sidebar-foreground">FreelanceHub</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4">
            <ul className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon
                const isActive = pathname === item.href
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      onClick={() => setIsOpen(false)}
                      className={cn(
                        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors",
                        isActive
                          ? "bg-sidebar-accent text-sidebar-primary"
                          : "text-sidebar-foreground hover:bg-sidebar-accent/50 hover:text-sidebar-primary",
                      )}
                    >
                      <Icon className="h-4 w-4" />
                      {item.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* User Menu */}
          <div className="p-4 border-t border-sidebar-border">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-8 bg-sidebar-accent rounded-full flex items-center justify-center">
                <User className="h-4 w-4 text-sidebar-accent-foreground" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-sidebar-foreground truncate">{session?.user.email}</p>
                <p className="text-xs text-sidebar-foreground/60 capitalize">{session?.user.role}</p>
              </div>
            </div>
            <div className="space-y-1">
              <Button
                variant="ghost"
                size="sm"
                asChild
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <Link href="/settings">
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </Link>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSignOut}
                className="w-full justify-start text-sidebar-foreground hover:bg-sidebar-accent/50"
              >
                <LogOut className="mr-2 h-4 w-4" />
                Sign Out
              </Button>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setIsOpen(false)} />}
    </>
  )
}
