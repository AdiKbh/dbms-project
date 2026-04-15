"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookMarked, ArrowLeft, Check, AlertCircle } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { useLibrary } from "@/context/library-context"

export default function IssueBookPage() {
  const router = useRouter()
  const { books, members, issueBook } = useLibrary()
  const [selectedBookId, setSelectedBookId] = useState("")
  const [selectedMemberId, setSelectedMemberId] = useState("")
  const [dueDate, setDueDate] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const availableBooks = books.filter((book) => book.availableCopies > 0)
  const activeMembers = members.filter((member) => member.status === "active")

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!selectedBookId || !selectedMemberId || !dueDate) {
      setError("Please fill in all fields")
      return
    }

    const result = issueBook(selectedBookId, selectedMemberId, dueDate)
    
    if (result) {
      setSuccess(true)
      setTimeout(() => {
        router.push("/dashboard/admin/transactions")
      }, 1500)
    } else {
      setError("Failed to issue book. Please check availability.")
    }
  }

  const selectedBook = books.find((b) => b.id === selectedBookId)
  const selectedMember = members.find((m) => m.id === selectedMemberId)

  // Default due date: 14 days from now
  const getDefaultDueDate = () => {
    const date = new Date()
    date.setDate(date.getDate() + 14)
    return date.toISOString().split("T")[0]
  }

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
        <h1 className="text-3xl font-bold tracking-tight">Issue Book</h1>
        <p className="mt-1 text-muted-foreground">
          Issue a book to a library member
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookMarked className="h-5 w-5 text-primary" />
              Issue Details
            </CardTitle>
            <CardDescription>
              Select a book and member to complete the transaction
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
                    Book issued successfully. Redirecting...
                  </AlertDescription>
                </Alert>
              )}

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="book">Select Book *</FieldLabel>
                  <Select value={selectedBookId} onValueChange={setSelectedBookId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a book" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableBooks.map((book) => (
                        <SelectItem key={book.id} value={book.id}>
                          {book.title} ({book.availableCopies} available)
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="member">Select Member *</FieldLabel>
                  <Select value={selectedMemberId} onValueChange={setSelectedMemberId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a member" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeMembers.map((member) => (
                        <SelectItem key={member.id} value={member.id}>
                          {member.name} ({member.membershipId})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <Field>
                  <FieldLabel htmlFor="dueDate">Due Date *</FieldLabel>
                  <Input
                    id="dueDate"
                    type="date"
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                    min={new Date().toISOString().split("T")[0]}
                    placeholder={getDefaultDueDate()}
                  />
                </Field>
              </FieldGroup>

              <div className="flex gap-4">
                <Button type="submit" disabled={success}>
                  Issue Book
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
            <CardTitle>Transaction Preview</CardTitle>
            <CardDescription>Review the details before issuing</CardDescription>
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
                    <p className="mt-1 text-sm">
                      Available: {selectedBook.availableCopies} / {selectedBook.totalCopies}
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
                    <p className="mt-1 text-sm">
                      Currently borrowed: {selectedMember.booksIssued} books
                    </p>
                  </div>
                ) : (
                  <p className="mt-1 text-sm text-muted-foreground">No member selected</p>
                )}
              </div>

              <div className="rounded-lg bg-muted/50 p-4">
                <p className="text-sm font-medium text-muted-foreground">Due Date</p>
                <p className="mt-1 font-semibold">
                  {dueDate || "Not set"}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}