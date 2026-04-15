"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { BookOpen, Menu, X, LogIn } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/library/books", label: "Books" },
  { href: "/achievements", label: "Achievements" },
  { href: "/events", label: "Events" },
]

export default function Navbar() {   // ✅ FIXED HERE
  const pathname = usePathname()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
            <BookOpen className="h-5 w-5 text-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-foreground">LibraryMS</span>
        </Link>

        <div className="hidden items-center gap-1 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-primary/10 text-primary"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground",
              )}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="hidden items-center gap-2 md:flex">
          <Link href="/auth/student-login">
            <Button variant="ghost" size="sm">
              Student Login
            </Button>
          </Link>
          <Link href="/auth/admin-login">
            <Button size="sm">
              <LogIn className="mr-2 h-4 w-4" />
              Admin Login
            </Button>
          </Link>
        </div>

        <button
          className="inline-flex items-center justify-center rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground md:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </nav>

      {mobileMenuOpen && (
        <div className="border-t border-border bg-background md:hidden">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-md px-3 py-2 text-base font-medium",
                  pathname === link.href
                    ? "bg-primary/10 text-primary"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground",
                )}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-4 flex flex-col gap-2 border-t border-border pt-4">
              <Link href="/auth/student-login" onClick={() => setMobileMenuOpen(false)}>
                <Button variant="outline" className="w-full">
                  Student Login
                </Button>
              </Link>
              <Link href="/auth/admin-login" onClick={() => setMobileMenuOpen(false)}>
                <Button className="w-full">
                  <LogIn className="mr-2 h-4 w-4" />
                  Admin Login
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}