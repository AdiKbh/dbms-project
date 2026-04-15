"use client"

import { Calendar, MapPin, Clock, Image as ImageIcon } from "lucide-react"
import  Navbar  from "@/components/navbar"
import  Footer from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLibrary } from "@/context/library-context"

export default function EventsPage() {
  const { events } = useLibrary()

  const now = new Date()
  const upcomingEvents = events.filter((e) => new Date(e.date) >= now)
  const pastEvents = events.filter((e) => new Date(e.date) < now)

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden bg-accent/5 py-20">
          <div className="absolute inset-0 -z-10">
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]" />
          </div>
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-accent/10">
              <Calendar className="h-8 w-8 text-accent" />
            </div>
            <h1 className="text-balance text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
              Events & Gallery
            </h1>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
              Discover our upcoming events and relive the memories from past gatherings
            </p>
          </div>
        </section>

        {/* Events Section */}
        <section className="py-16">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <Tabs defaultValue="upcoming" className="space-y-8">
              <TabsList className="mx-auto flex w-fit">
                <TabsTrigger value="upcoming">
                  Upcoming Events ({upcomingEvents.length})
                </TabsTrigger>
                <TabsTrigger value="past">
                  Past Events ({pastEvents.length})
                </TabsTrigger>
                <TabsTrigger value="gallery">
                  Gallery
                </TabsTrigger>
              </TabsList>

              {/* Upcoming Events */}
              <TabsContent value="upcoming" className="space-y-6">
                {upcomingEvents.length === 0 ? (
                  <div className="rounded-lg bg-muted/50 p-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">
                      No upcoming events at the moment. Check back soon!
                    </p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2">
                    {upcomingEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="aspect-video bg-muted">
                          <div className="flex h-full items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                          </div>
                        </div>
                        <CardHeader>
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <CardTitle>{event.title}</CardTitle>
                              <CardDescription className="mt-2">{event.description}</CardDescription>
                            </div>
                            <Badge className="shrink-0">Upcoming</Badge>
                          </div>
                        </CardHeader>
                        <CardContent>
                          <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-4 w-4" />
                              <span>
                                {new Date(event.date).toLocaleDateString("en-US", {
                                  weekday: "long",
                                  year: "numeric",
                                  month: "long",
                                  day: "numeric",
                                })}
                              </span>
                            </div>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-4 w-4" />
                              <span>Main Library Hall</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-4 w-4" />
                              <span>10:00 AM - 5:00 PM</span>
                            </div>
                          </div>
                          <Button className="mt-4 w-full">Register Now</Button>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Past Events */}
              <TabsContent value="past" className="space-y-6">
                {pastEvents.length === 0 ? (
                  <div className="rounded-lg bg-muted/50 p-12 text-center">
                    <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                    <p className="mt-4 text-muted-foreground">No past events to display.</p>
                  </div>
                ) : (
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {pastEvents.map((event) => (
                      <Card key={event.id} className="overflow-hidden">
                        <div className="aspect-video bg-muted">
                          <div className="flex h-full items-center justify-center">
                            <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                          </div>
                        </div>
                        <CardHeader className="pb-2">
                          <CardTitle className="text-lg">{event.title}</CardTitle>
                          <Badge variant="secondary" className="w-fit">
                            {new Date(event.date).toLocaleDateString("en-US", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </Badge>
                        </CardHeader>
                        <CardContent>
                          <CardDescription>{event.description}</CardDescription>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </TabsContent>

              {/* Gallery */}
              <TabsContent value="gallery" className="space-y-6">
                <div className="text-center">
                  <h2 className="text-2xl font-bold">Event Gallery</h2>
                  <p className="mt-2 text-muted-foreground">
                    Memories from our library events
                  </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                  {[1, 2, 3, 4, 5, 6].map((i) => (
                    <div
                      key={i}
                      className="group relative aspect-square overflow-hidden rounded-lg bg-muted"
                    >
                      <div className="flex h-full items-center justify-center">
                        <ImageIcon className="h-12 w-12 text-muted-foreground/30" />
                      </div>
                      <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/60 to-transparent p-4 opacity-0 transition-opacity group-hover:opacity-100">
                        <p className="text-sm text-white">Event Photo {i}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center">
                  <Button variant="outline">Load More Photos</Button>
                </div>
              </TabsContent>
            </Tabs>
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="border-t border-border bg-muted/30 py-16">
          <div className="mx-auto max-w-7xl px-4 text-center sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold tracking-tight">Stay Updated</h2>
            <p className="mt-2 text-muted-foreground">
              Subscribe to our newsletter to never miss an event
            </p>
            <div className="mx-auto mt-8 flex max-w-md gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 rounded-md border border-input bg-background px-4 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              />
              <Button>Subscribe</Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}