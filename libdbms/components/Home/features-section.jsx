"use client"

import { BookMarked, Calendar, BarChart3, Shield, Clock, Bell } from "lucide-react"

const features = [
  {
    icon: BookMarked,
    title: "Book Management",
    description:
      "Add, edit, and manage your entire book collection with ease. Track copies and availability in real-time.",
  },
  {
    icon: Calendar,
    title: "Reservations",
    description:
      "Allow members to reserve books for specific dates. Never miss out on popular titles.",
  },
  {
    icon: BarChart3,
    title: "Analytics Dashboard",
    description:
      "Get insights into borrowing patterns, popular books, and member activity with detailed reports.",
  },
  {
    icon: Shield,
    title: "Secure Access",
    description:
      "Role-based authentication for admins and students with secure login and data protection.",
  },
  {
    icon: Clock,
    title: "Due Date Tracking",
    description:
      "Automatic tracking of due dates with fine calculation for overdue books.",
  },
  {
    icon: Bell,
    title: "Notifications",
    description:
      "Keep members informed about due dates, reservations, and new arrivals.",
  },
]

export default function FeaturesSection() {
  return (
    <section className="border-t border-border bg-muted/30 py-20">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Everything you need to manage your library
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Powerful features designed to make library management effortless for
            administrators and enjoyable for members.
          </p>
        </div>

        <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div key={index} className="relative">
                <div className="flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-foreground">
                      {feature.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {feature.description}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}