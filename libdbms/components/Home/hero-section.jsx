"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Users, Search, ArrowRight } from "lucide-react"

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-background">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
        <div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-primary/20 opacity-20 blur-[100px]" />
      </div>

      <div className="mx-auto max-w-7xl px-4 py-24 sm:px-6 sm:py-32 lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-1.5 text-sm">
            <span className="flex h-2 w-2 rounded-full bg-accent" />
            <span className="text-muted-foreground">
              Trusted by 10,000+ students
            </span>
          </div>

          <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl lg:text-6xl">
            Your Gateway to <span className="text-primary">Knowledge</span>{" "}
            and <span className="text-accent">Learning</span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg text-muted-foreground">
            A comprehensive library management system designed to streamline
            book borrowing, member management, and resource tracking for modern
            educational institutions.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/library/books">
              <Button size="lg" className="w-full sm:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Browse Catalog
              </Button>
            </Link>
            <Link href="/auth/student-login">
              <Button variant="outline" size="lg" className="w-full sm:w-auto">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="mt-20 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <BookOpen className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Extensive Collection</h3>
            <p className="text-sm text-muted-foreground">
              Access thousands of books across various genres and academic
              subjects.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-accent/50 hover:shadow-lg">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent/10">
              <Users className="h-6 w-6 text-accent" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Member Services</h3>
            <p className="text-sm text-muted-foreground">
              Easy book borrowing, returns, and reservation system for all
              members.
            </p>
          </div>

          <div className="group relative overflow-hidden rounded-xl border border-border bg-card p-6 transition-all hover:border-primary/50 hover:shadow-lg sm:col-span-2 lg:col-span-1">
            <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
              <Search className="h-6 w-6 text-primary" />
            </div>
            <h3 className="mb-2 text-lg font-semibold">Smart Search</h3>
            <p className="text-sm text-muted-foreground">
              Find books instantly with our powerful search and filter
              capabilities.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}