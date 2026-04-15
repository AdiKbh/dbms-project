"use client"

import { useState } from "react"
import { Search, Users } from "lucide-react"
import  Navbar  from "@/components/navbar"
import  Footer  from "@/components/footer"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { useLibrary } from "@/context/library-context"

export default function LibraryMembersPage() {
  const { members } = useLibrary()
  const [searchQuery, setSearchQuery] = useState("")

  const filteredMembers = members.filter(
    (member) =>
      member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      member.membershipId.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Library Members</h1>
            <p className="mt-2 text-muted-foreground">
              Our community of {members.length} active readers
            </p>
          </div>

          {/* Search */}
          <div className="mb-8">
            <div className="relative max-w-md">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search members..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Results count */}
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {filteredMembers.length} of {members.length} members
          </p>

          {/* Members Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMembers.length === 0 ? (
              <div className="col-span-full rounded-lg bg-muted/50 p-12 text-center">
                <Users className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  No members found matching your search.
                </p>
              </div>
            ) : (
              filteredMembers.map((member) => (
                <Card key={member.id}>
                  <CardHeader className="pb-3">
                    <div className="flex items-center gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {member.name
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <CardTitle className="text-lg">{member.name}</CardTitle>
                        <CardDescription>{member.membershipId}</CardDescription>
                      </div>
                      <Badge
                        variant={
                          member.status === "active"
                            ? "default"
                            : member.status === "inactive"
                            ? "secondary"
                            : "destructive"
                        }
                      >
                        {member.status}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Email</span>
                        <span className="truncate ml-2">{member.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Joined</span>
                        <span>{member.joinDate}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-muted-foreground">Books Issued</span>
                        <span>{member.booksIssued}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}