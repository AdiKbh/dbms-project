"use client"

import { BookOpen, Clock, CheckCircle } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { useLibrary } from "@/context/library-context"
import { useAuth } from "@/context/auth-context"

export default function MyBooksPage() {
  const { user } = useAuth()
  const { getMemberTransactions, members } = useLibrary()

  // Find the member by email
  const member = members.find((m) => m.email === user?.email)
  const memberId = member?.id || ""

  const transactions = getMemberTransactions(memberId)

  const currentlyBorrowed = transactions.filter((t) => t.status === "issued")
  const returnedBooks = transactions.filter((t) => t.status === "returned")

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">My Books</h1>
        <p className="mt-1 text-muted-foreground">
          View your borrowed books and transaction history
        </p>
      </div>

      <Tabs defaultValue="current" className="space-y-6">
        <TabsList>
          <TabsTrigger value="current" className="flex items-center gap-2">
            <Clock className="h-4 w-4" />
            Currently Borrowed ({currentlyBorrowed.length})
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4" />
            History ({returnedBooks.length})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="current">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5 text-primary" />
                Currently Borrowed Books
              </CardTitle>
              <CardDescription>
                Books you need to return by their due dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              {currentlyBorrowed.length === 0 ? (
                <div className="rounded-lg bg-muted/50 p-8 text-center">
                  <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">
                    You haven&apos;t borrowed any books yet.
                  </p>
                </div>
              ) : (
                <div className="rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Due Date</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {currentlyBorrowed.map((transaction) => {
                        const isOverdue = new Date() > new Date(transaction.dueDate)
                        const daysUntilDue = Math.ceil(
                          (new Date(transaction.dueDate).getTime() - new Date().getTime()) /
                            (1000 * 60 * 60 * 24)
                        )
                        return (
                          <TableRow key={transaction.id}>
                            <TableCell className="font-medium">
                              {transaction.bookTitle}
                            </TableCell>
                            <TableCell>{transaction.issueDate}</TableCell>
                            <TableCell>
                              <div className="flex flex-col">
                                <span>{transaction.dueDate}</span>
                                {!isOverdue && daysUntilDue <= 3 && (
                                  <span className="text-xs text-warning">
                                    {daysUntilDue} days remaining
                                  </span>
                                )}
                              </div>
                            </TableCell>
                            <TableCell>
                              <Badge variant={isOverdue ? "destructive" : "default"}>
                                {isOverdue ? "Overdue" : "Active"}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        )
                      })}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="history">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <CheckCircle className="h-5 w-5 text-primary" />
                Return History
              </CardTitle>
              <CardDescription>
                Books you have previously borrowed and returned
              </CardDescription>
            </CardHeader>
            <CardContent>
              {returnedBooks.length === 0 ? (
                <div className="rounded-lg bg-muted/50 p-8 text-center">
                  <CheckCircle className="mx-auto h-12 w-12 text-muted-foreground/50" />
                  <p className="mt-4 text-muted-foreground">No return history yet.</p>
                </div>
              ) : (
                <div className="rounded-lg border border-border">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Book Title</TableHead>
                        <TableHead>Issue Date</TableHead>
                        <TableHead>Return Date</TableHead>
                        <TableHead>Fine</TableHead>
                        <TableHead>Status</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {returnedBooks.map((transaction) => (
                        <TableRow key={transaction.id}>
                          <TableCell className="font-medium">
                            {transaction.bookTitle}
                          </TableCell>
                          <TableCell>{transaction.issueDate}</TableCell>
                          <TableCell>{transaction.returnDate}</TableCell>
                          <TableCell>
                            {transaction.fine ? (
                              <span className="text-destructive">
                                ${transaction.fine.toFixed(2)}
                              </span>
                            ) : (
                              "-"
                            )}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">Returned</Badge>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}