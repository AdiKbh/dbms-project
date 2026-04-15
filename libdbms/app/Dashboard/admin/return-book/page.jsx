"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Library, ArrowLeft, Check, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLibrary } from "@/context/library-context"

export default function ReturnBookPage() {
  const router = useRouter()
  const { transactions, returnBook, getBookById, getMemberById } = useLibrary()
  const [selectedTransactionId, setSelectedTransactionId] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const issuedTransactions = transactions.filter((t) => t.status === "issued")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!selectedTransactionId) {
      setError("Please select a transaction")
      return
    }

    const result = returnBook(selectedTransactionId)
    
    if (result) {
      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/admin/transactions")
      }, 1500)
    } else {
      setError("Failed to process return. Please try again.")
    }
  }

  const selectedTransaction = transactions.find((t) => t.id === selectedTransactionId)
  const selectedBook = selectedTransaction ? getBookById(selectedTransaction.bookId) : null
  const selectedMember = selectedTransaction ? getMemberById(selectedTransaction.memberId) : null

  const isOverdue = selectedTransaction
    ? new Date() > new Date(selectedTransaction.dueDate)
    : false
  
  const daysOverdue = selectedTransaction && isOverdue
    ? Math.ceil(
        (new Date().getTime() - new Date(selectedTransaction.dueDate).getTime()) /
          (1000 * 60 * 60 * 24)
      )
    : 0
  
  const estimatedFine = daysOverdue * 0.5

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <Link
          href="/dashboard/admin/transactions"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Transactions
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Return Book</h1>
        <p className="mt-1 text-muted-foreground">
          Process a book return from a library member
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Library className="h-5 w-5 text-primary" />
              Return Details
            </CardTitle>
            <CardDescription>
              Select an issued book to process the return
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              {error && (
                <Alert variant="destructive">
                  <AlertCircle className="h-4 w-4" />
                  <AlertTitle>Error</AlertTitle>
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {success && (
                <Alert className="border-success bg-success/10">
                  <Check className="h-4 w-4 text-success" />
                  <AlertTitle className="text-success">Success!</AlertTitle>
                  <AlertDescription>
                    Book returned successfully. Redirecting...
                  </AlertDescription>
                </Alert>
              )}

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="transaction">Select Issued Book *</FieldLabel>
                  <Select
                    value={selectedTransactionId}
                    onValueChange={setSelectedTransactionId}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a transaction" />
                    </SelectTrigger>
                    <SelectContent>
                      {issuedTransactions.length === 0 ? (
                        <SelectItem value="none" disabled>
                          No books currently issued
                        </SelectItem>
                      ) : (
                        issuedTransactions.map((transaction) => (
                          <SelectItem key={transaction.id} value={transaction.id}>
                            {transaction.bookTitle} - {transaction.memberName}
                          </SelectItem>
                        ))
                      )}
                    </SelectContent>
                  </Select>
                </Field>
              </FieldGroup>

              <div className="flex gap-4">
                <Button type="submit" disabled={success || issuedTransactions.length === 0}>
                  Process Return
                </Button>
                <Link href="/dashboard/admin/transactions">
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </Link>
              </div>
            </form>
          </CardContent>
        </Card>

        {/* Preview Card */}
        <Card>
          <CardHeader>
            <CardTitle>Return Preview</CardTitle>
            <CardDescription>Review the details before processing</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium text-muted-foreground">Book</p>
                {selectedBook ? (
                  <div className="mt-1">
                    <p className="font-semibold">{selectedBook.title}</p>
                    <p className="text-sm text-muted-foreground">
                      by {selectedBook.author}
                    </p>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">No book selected</p>
                )}
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium text-muted-foreground">Member</p>
                {selectedMember ? (
                  <div className="mt-1">
                    <p className="font-semibold">{selectedMember.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {selectedMember.membershipId}
                    </p>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">No member selected</p>
                )}
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                <div className="mt-1 flex items-center gap-2">
                  <p className="font-semibold">
                    {selectedTransaction?.dueDate || "Not selected"}
                  </p>
                  {isOverdue && (
                    <Badge variant="destructive">Overdue</Badge>
                  )}
                </div>
              </div>

              {isOverdue && (
                <div className="rounded-lg border border-destructive/50 bg-destructive/10 p-4">
                  <p className="text-sm font-medium text-destructive">Fine Details</p>
                  <div className="mt-1">
                    <p className="text-sm">Days overdue: {daysOverdue}</p>
                    <p className="text-lg font-bold text-destructive">
                      Estimated Fine: ${estimatedFine.toFixed(2)}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1">
                      (Rate: $0.50 per day)
                    </p>
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}