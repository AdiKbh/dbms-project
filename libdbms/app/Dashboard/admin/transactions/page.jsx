"use client"

import { useState } from "react"
import { Search, ArrowLeftRight, BookMarked, Library } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLibrary } from "@/context/library-context"

export default function AdminTransactionsPage() {
  const { transactions } = useLibrary()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")

  const filteredTransactions = transactions.filter((transaction) => {
    const matchesSearch =
      transaction.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transaction.memberName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || transaction.status === statusFilter
    return matchesSearch && matchesStatus
  })

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Transactions</h1>
          <p className="mt-1 text-muted-foreground">
            Track all book issue and return transactions
          </p>
        </div>
        <div className="flex gap-2">
          <Link href="/dashboard/admin/issue-book">
            <Button>
              <BookMarked className="mr-2 h-4 w-4" />
              Issue Book
            </Button>
          </Link>
          <Link href="/dashboard/admin/return-book">
            <Button variant="outline">
              <Library className="mr-2 h-4 w-4" />
              Return Book
            </Button>
          </Link>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <ArrowLeftRight className="h-5 w-5 text-primary" />
            Transaction History
          </CardTitle>
          <CardDescription>
            {filteredTransactions.length} of {transactions.length} transactions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by book title or member name..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="issued">Issued</SelectItem>
                <SelectItem value="returned">Returned</SelectItem>
                <SelectItem value="overdue">Overdue</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Issue Date</TableHead>
                  <TableHead>Due Date</TableHead>
                  <TableHead>Return Date</TableHead>
                  <TableHead>Fine</TableHead>
                  <TableHead>Status</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredTransactions.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No transactions found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredTransactions.map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell className="font-medium">
                        {transaction.bookTitle}
                      </TableCell>
                      <TableCell>{transaction.memberName}</TableCell>
                      <TableCell>{transaction.issueDate}</TableCell>
                      <TableCell>{transaction.dueDate}</TableCell>
                      <TableCell>{transaction.returnDate || "-"}</TableCell>
                      <TableCell>
                        {transaction.fine ? `$${transaction.fine.toFixed(2)}` : "-"}
                      </TableCell>
                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}