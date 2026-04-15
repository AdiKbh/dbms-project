"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  LayoutDashboard,
  Users,
  BookPlus,
  UserPlus,
  ArrowLeftRight,
  BookMarked,
  Calendar,
  LogOut,
  Settings,
  ChevronLeft,
  ChevronRight,
  Library,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { useAuth } from "@/context/auth-context"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useState } from "react"

const adminLinks = [
  { href: "/dashboard/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/admin/books", label: "Manage Books", icon: BookOpen },
  { href: "/dashboard/admin/add-book", label: "Add Book", icon: BookPlus },
  { href: "/dashboard/admin/members", label: "Members", icon: Users },
  { href: "/dashboard/admin/add-member", label: "Add Member", icon: UserPlus },
  { href: "/dashboard/admin/transactions", label: "Transactions", icon: ArrowLeftRight },
  { href: "/dashboard/admin/issue-book", label: "Issue Book", icon: BookMarked },
  { href: "/dashboard/admin/return-book", label: "Return Book", icon: Library },
  { href: "/dashboard/admin/reservations", label: "Reservations", icon: Calendar },
]

const studentLinks = [
  { href: "/dashboard/student", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/student/my-books", label: "My Books", icon: BookOpen },
  { href: "/dashboard/student/reserve", label: "Reserve Book", icon: Calendar },
  { href: "/library/books", label: "Browse Books", icon: Library },
]

export function DashboardSidebar() {
  const pathname = usePathname()
  const { user, logout } = useAuth()
  const [collapsed, setCollapsed] = useState(false)

  const links = user?.role === "admin" ? adminLinks : studentLinks

  return (
    <aside
      className={cn(
        "sticky top-0 flex h-screen flex-col border-r border-sidebar-border bg-sidebar transition-all duration-300",
        collapsed ? "w-16" : "w-64",
      )}
    >
      <div className="flex h-16 items-center justify-between border-b border-sidebar-border px-4">
        {!collapsed && (
          <Link href="/" className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
              <BookOpen className="h-4 w-4 text-sidebar-primary-foreground" />
            </div>
            <span className="font-semibold text-sidebar-foreground">LibraryMS</span>
          </Link>
        )}
        {collapsed && (
          <div className="mx-auto flex h-8 w-8 items-center justify-center rounded-lg bg-sidebar-primary">
            <BookOpen className="h-4 w-4 text-sidebar-primary-foreground" />
          </div>
        )}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={cn(
            "rounded-md p-1 text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            collapsed && "absolute -right-3 top-5 z-10 rounded-full border border-sidebar-border bg-sidebar",
          )}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </button>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-2">
        {links.map((link) => {
          const Icon = link.icon
          const isActive = pathname === link.href
          return (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors",
                isActive
                  ? "bg-sidebar-primary text-sidebar-primary-foreground"
                  : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                collapsed && "justify-center px-2",
              )}
              title={collapsed ? link.label : undefined}
            >
              <Icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{link.label}</span>}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-sidebar-border p-2">
        {!collapsed && (
          <div className="mb-2 flex items-center gap-3 rounded-lg bg-sidebar-accent/50 px-3 py-2">
            <Avatar className="h-8 w-8">
              <AvatarFallback className="bg-sidebar-primary text-sidebar-primary-foreground text-xs">
                {user?.name
                  ?.split(" ")
                  .map((n) => n[0])
                  .join("") || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 overflow-hidden">
              <p className="truncate text-sm font-medium text-sidebar-foreground">{user?.name}</p>
              <p className="truncate text-xs text-sidebar-foreground/60">{user?.role}</p>
            </div>
          </div>
        )}
        <div className={cn("flex gap-1", collapsed ? "flex-col items-center" : "")}>
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground",
              collapsed ? "w-full justify-center" : "flex-1",
            )}
            title={collapsed ? "Settings" : undefined}
          >
            <Settings className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Settings</span>}
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={logout}
            className={cn(
              "text-sidebar-foreground/70 hover:bg-destructive/20 hover:text-destructive",
              collapsed ? "w-full justify-center" : "flex-1",
            )}
            title={collapsed ? "Logout" : undefined}
          >
            <LogOut className="h-4 w-4" />
            {!collapsed && <span className="ml-2">Logout</span>}
          </Button>
        </div>
      </div>
    </aside>
  )
}