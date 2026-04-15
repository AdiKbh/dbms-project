"use client"

import { Trophy, Monitor, Users, Leaf, Award, Star } from "lucide-react"
import  Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLibrary } from "@/context/library-context"

const iconMap = {
  trophy: Trophy,
  monitor: Monitor,
  users: Users,
  leaf: Leaf,
  award: Award,
  star: Star,
}

export default function AchievementsPage() {
  const { achievements } = useLibrary()

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-primary/5 py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
              <Trophy className="h-8 w-8 text-primary" />
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Our Achievements
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Celebrating our milestones and recognition in providing excellent library services
            </p>
          </div>
        </section>

        {/* Achievements Grid */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="grid gap-8 md:grid-cols-2">
              {achievements.map((achievement, index) => {
                const Icon = iconMap[achievement.icon] || Award
                return (
                  <Card
                    key={achievement.id}
                    className="group relative overflow-hidden transition-all hover:shadow-lg"
                  >
                    <div className="absolute right-4 top-4 text-6xl font-bold text-muted/20">
                      #{index + 1}
                    </div>
                    <CardHeader className="pb-2">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-primary/10 transition-colors group-hover:bg-primary/20">
                          <Icon className="h-7 w-7 text-primary" />
                        </div>
                        <div className="flex-1">
                          <CardTitle className="text-xl">{achievement.title}</CardTitle>
                          <Badge variant="outline" className="mt-2">
                            {new Date(achievement.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "long",
                            })}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base">
                        {achievement.description}
                      </CardDescription>
                    </CardContent>
                  </Card>
                )
              })}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h2 className="text-2xl font-bold tracking-tight">By the Numbers</h2>
              <p className="mt-2 text-muted-foreground">Our journey in numbers</p>
            </div>
            <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">25+</p>
                <p className="mt-2 text-sm text-muted-foreground">Years of Service</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">15</p>
                <p className="mt-2 text-sm text-muted-foreground">National Awards</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">50K+</p>
                <p className="mt-2 text-sm text-muted-foreground">Books Catalogued</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-primary">10K+</p>
                <p className="mt-2 text-sm text-muted-foreground">Happy Members</p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}