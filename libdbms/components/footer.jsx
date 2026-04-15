import Link from "next/link"
import { BookOpen } from "lucide-react"

export default function Footer() {   // ✅ FIXED HERE
  return (
    <footer className="border-t border-border bg-muted/30">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          
          <div className="sm:col-span-2 lg:col-span-1">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold text-foreground">LibraryMS</span>
            </Link>
            <p className="mt-4 text-sm text-muted-foreground">
              A comprehensive library management system for modern educational institutions.
            </p>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Quick Links</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/library/books" className="text-sm text-muted-foreground hover:text-foreground">
                  Browse Books
                </Link>
              </li>
              <li>
                <Link href="/achievements" className="text-sm text-muted-foreground hover:text-foreground">
                  Achievements
                </Link>
              </li>
              <li>
                <Link href="/events" className="text-sm text-muted-foreground hover:text-foreground">
                  Events
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">For Members</h3>
            <ul className="mt-4 space-y-2">
              <li>
                <Link href="/auth/student-login" className="text-sm text-muted-foreground hover:text-foreground">
                  Student Login
                </Link>
              </li>
              <li>
                <Link href="/auth/admin-login" className="text-sm text-muted-foreground hover:text-foreground">
                  Admin Login
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold text-foreground">Contact</h3>
            <ul className="mt-4 space-y-2">
              <li className="text-sm text-muted-foreground">123 Library Street</li>
              <li className="text-sm text-muted-foreground">University Campus</li>
              <li className="text-sm text-muted-foreground">contact@libraryms.edu</li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8">
          <p className="text-center text-sm text-muted-foreground">
            &copy; {new Date().getFullYear()} LibraryMS. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}