"use client"

import { BookOpen, Calendar, Clock, AlertTriangle } from "lucide-react"
import Link from "next/link"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { useLibrary } from "@/context/library-context"
import { useAuth } from "@/context/auth-context"

export default function StudentDashboardPage() {
  const { user } = useAuth()
  const { getMemberTransactions, getMemberReservations, members, books } = useLibrary()

  // Find the member by email
  const member = members.find((m) => m.email === user?.email)
  const memberId = member?.id || ""

  const transactions = getMemberTransactions(memberId)
  const reservations = getMemberReservations(memberId)

  const currentlyBorrowed = transactions.filter((t) => t.status === "issued")
  const pendingReservations = reservations.filter((r) => r.status === "pending")
  const overdueBooks = currentlyBorrowed.filter(
    (t) => new Date() > new Date(t.dueDate)
  )

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome, {user?.name}</h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s your library activity summary
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Books Borrowed"
          value={currentlyBorrowed.length}
          description="Currently checked out"
          icon={BookOpen}
        />
        <StatsCard
          title="Reservations"
          value={pendingReservations.length}
          description="Pending reservations"
          icon={Calendar}
        />
        <StatsCard
          title="Total Transactions"
          value={transactions.length}
          description="All time"
          icon={Clock}
        />
        <StatsCard
          title="Overdue"
          value={overdueBooks.length}
          description={overdueBooks.length > 0 ? "Please return soon!" : "All good!"}
          icon={AlertTriangle}
          className={overdueBooks.length > 0 ? "border-destructive/50" : ""}
        />
      </div>

      {/* Current Books and Reservations */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Currently Borrowed */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                My Borrowed Books
              </CardTitle>
              <CardDescription>Books currently in your possession</CardDescription>
            </div>
            <Link href="/dashboard/student/my-books">
              <Button variant="outline" size="sm">View All</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {currentlyBorrowed.length === 0 ? (
                <div className="rounded-lg bg-muted/50 p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    You haven&apos;t borrowed any books yet.
                  </p>
                  <Link href="/library/books">
                    <Button variant="link" className="mt-2">Browse Books</Button>
                  </Link>
                </div>
              ) : (
                currentlyBorrowed.slice(0, 3).map((transaction) => {
                  const isOverdue = new Date() > new Date(transaction.dueDate)
                  return (
                    <div
                      key={transaction.id}
                      className="flex items-center justify-between rounded-lg border border-border p-3"
                    >
                      <div className="flex-1">
                        <p className="font-medium">{transaction.bookTitle}</p>
                        <p className="text-sm text-muted-foreground">
                          Due: {transaction.dueDate}
                        </p>
                      </div>
                      <Badge variant={isOverdue ? "destructive" : "secondary"}>
                        {isOverdue ? "Overdue" : "Issued"}
                      </Badge>
                    </div>
                  )
                })
              )}
            </div>
          </CardContent>
        </Card>

        {/* Reservations */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary" />
                My Reservations
              </CardTitle>
              <CardDescription>Your book reservations</CardDescription>
            </div>
            <Link href="/dashboard/student/reserve">
              <Button variant="outline" size="sm">Reserve Book</Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {reservations.length === 0 ? (
                <div className="rounded-lg bg-muted/50 p-6 text-center">
                  <p className="text-sm text-muted-foreground">
                    You don&apos;t have any reservations.
                  </p>
                  <Link href="/dashboard/student/reserve">
                    <Button variant="link" className="mt-2">Reserve a Book</Button>
                  </Link>
                </div>
              ) : (
                reservations.slice(0, 3).map((reservation) => (
                  <div
                    key={reservation.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{reservation.bookTitle}</p>
                      <p className="text-sm text-muted-foreground">
                        {reservation.startDate} to {reservation.endDate}
                      </p>
                    </div>
                    <Badge
                      variant={
                        reservation.status === "pending"
                          ? "default"
                          : reservation.status === "confirmed"
                          ? "secondary"
                          : "outline"
                      }
                    >
                      {reservation.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="mt-8">
        <h2 className="mb-4 text-lg font-semibold">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Link href="/library/books">
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <BookOpen className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">Browse Catalog</p>
                  <p className="text-sm text-muted-foreground">{books.length} books</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/student/reserve">
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <Calendar className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Reserve Book</p>
                  <p className="text-sm text-muted-foreground">Plan ahead</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/dashboard/student/my-books">
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="font-medium">My History</p>
                  <p className="text-sm text-muted-foreground">View transactions</p>
                </div>
              </CardContent>
            </Card>
          </Link>
          <Link href="/achievements">
            <Card className="cursor-pointer transition-colors hover:bg-muted/50">
              <CardContent className="flex items-center gap-4 p-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent/10">
                  <AlertTriangle className="h-5 w-5 text-accent" />
                </div>
                <div>
                  <p className="font-medium">Achievements</p>
                  <p className="text-sm text-muted-foreground">Library awards</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </div>
  )
}