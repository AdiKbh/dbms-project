"use client"

import { BookOpen, Users, ArrowLeftRight, Calendar, TrendingUp, Clock } from "lucide-react"
import { StatsCard } from "@/components/stats-card"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { useLibrary } from "@/context/library-context"
import { useAuth } from "@/context/auth-context"

export default function AdminDashboardPage() {
  const { user } = useAuth()
  const { books, members, transactions, reservations } = useLibrary()

  const totalBooks = books.reduce((acc, book) => acc + book.totalCopies, 0)
  const availableBooks = books.reduce((acc, book) => acc + book.availableCopies, 0)
  const activeMembers = members.filter((m) => m.status === "active").length
  const issuedBooks = transactions.filter((t) => t.status === "issued").length
  const pendingReservations = reservations.filter((r) => r.status === "pending").length

  const recentTransactions = transactions.slice(-5).reverse()

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Welcome back, {user?.name}</h1>
        <p className="mt-1 text-muted-foreground">
          Here&apos;s an overview of your library&apos;s performance today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Books"
          value={totalBooks}
          description={`${availableBooks} available`}
          icon={BookOpen}
          trend={{ value: 12, isPositive: true }}
        />
        <StatsCard
          title="Active Members"
          value={activeMembers}
          description={`${members.length} total members`}
          icon={Users}
          trend={{ value: 8, isPositive: true }}
        />
        <StatsCard
          title="Books Issued"
          value={issuedBooks}
          description="Currently checked out"
          icon={ArrowLeftRight}
        />
        <StatsCard
          title="Pending Reservations"
          value={pendingReservations}
          description="Awaiting confirmation"
          icon={Calendar}
        />
      </div>

      {/* Charts and Tables */}
      <div className="mt-8 grid gap-6 lg:grid-cols-2">
        {/* Recent Transactions */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Transactions
            </CardTitle>
            <CardDescription>Latest book issue and return activity</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentTransactions.length === 0 ? (
                <p className="text-center text-sm text-muted-foreground py-8">
                  No recent transactions
                </p>
              ) : (
                recentTransactions.map((transaction) => (
                  <div
                    key={transaction.id}
                    className="flex items-center justify-between rounded-lg border border-border p-3"
                  >
                    <div className="flex-1">
                      <p className="font-medium">{transaction.bookTitle}</p>
                      <p className="text-sm text-muted-foreground">
                        {transaction.memberName} &bull; {transaction.issueDate}
                      </p>
                    </div>
                    <Badge
                      variant={
                        transaction.status === "issued"
                          ? "default"
                          : transaction.status === "returned"
                          ? "secondary"
                          : "destructive"
                      }
                    >
                      {transaction.status}
                    </Badge>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Quick Stats */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Library Overview
            </CardTitle>
            <CardDescription>Key metrics at a glance</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Book Categories</p>
                  <p className="text-2xl font-bold">
                    {new Set(books.map((b) => b.category)).size}
                  </p>
                </div>
                <BookOpen className="h-8 w-8 text-primary/50" />
              </div>

              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Total Transactions</p>
                  <p className="text-2xl font-bold">{transactions.length}</p>
                </div>
                <ArrowLeftRight className="h-8 w-8 text-primary/50" />
              </div>

              <div className="flex items-center justify-between rounded-lg bg-muted/50 p-4">
                <div>
                  <p className="text-sm text-muted-foreground">Books with Low Stock</p>
                  <p className="text-2xl font-bold">
                    {books.filter((b) => b.availableCopies <= 2).length}
                  </p>
                </div>
                <Calendar className="h-8 w-8 text-primary/50" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}