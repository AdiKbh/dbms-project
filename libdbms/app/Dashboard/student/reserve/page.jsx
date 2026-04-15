"use client"

import { useState } from "react"
import { Calendar, Check, AlertCircle, BookOpen } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
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

export default function ReserveBookPage() {
  const { user } = useAuth()
  const { books, members, reserveBook, getMemberReservations, cancelReservation } = useLibrary()

  // Find the member by email
  const member = members.find((m) => m.email === user?.email)
  const memberId = member?.id || ""

  const [selectedBookId, setSelectedBookId] = useState("")
  const [startDate, setStartDate] = useState("")
  const [endDate, setEndDate] = useState("")
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const reservations = getMemberReservations(memberId)

  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")
    setSuccess(false)

    if (!selectedBookId || !startDate || !endDate) {
      setError("Please fill in all fields")
      return
    }

    if (new Date(startDate) >= new Date(endDate)) {
      setError("End date must be after start date")
      return
    }

    if (new Date(startDate) < new Date()) {
      setError("Start date cannot be in the past")
      return
    }

    const result = reserveBook(selectedBookId, memberId, startDate, endDate)

    if (result) {
      setSuccess(true)
      setSelectedBookId("")
      setStartDate("")
      setEndDate("")
      setTimeout(() => setSuccess(false), 3000)
    } else {
      setError("Failed to reserve book. Please try again.")
    }
  }

  const selectedBook = books.find((b) => b.id === selectedBookId)

  const getMinStartDate = () => {
    const tomorrow = new Date()
    tomorrow.setDate(tomorrow.getDate() + 1)
    return tomorrow.toISOString().split("T")[0]
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Reserve a Book</h1>
        <p className="mt-1 text-muted-foreground">
          Reserve books for specific dates to ensure availability
        </p>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        {/* Reservation Form */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary" />
              New Reservation
            </CardTitle>
            <CardDescription>
              Select a book and your preferred dates
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
                    Your reservation has been submitted.
                  </AlertDescription>
                </Alert>
              )}

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="book">Select Book *</FieldLabel>
                  <Select value={selectedBookId} onValueChange={setSelectedBookId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Choose a book to reserve" />
                    </SelectTrigger>
                    <SelectContent>
                      {books.map((book) => (
                        <SelectItem key={book.id} value={book.id}>
                          {book.title} by {book.author}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>

                <div className="grid gap-4 sm:grid-cols-2">
                  <Field>
                    <FieldLabel htmlFor="startDate">Start Date *</FieldLabel>
                    <Input
                      id="startDate"
                      type="date"
                      value={startDate}
                      onChange={(e) => setStartDate(e.target.value)}
                      min={getMinStartDate()}
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="endDate">End Date *</FieldLabel>
                    <Input
                      id="endDate"
                      type="date"
                      value={endDate}
                      onChange={(e) => setEndDate(e.target.value)}
                      min={startDate || getMinStartDate()}
                    />
                  </Field>
                </div>
              </FieldGroup>

              {selectedBook && (
                <div className="rounded-lg bg-muted/50 p-4">
                  <p className="text-sm font-medium text-muted-foreground">Selected Book</p>
                  <div className="mt-2">
                    <p className="font-semibold">{selectedBook.title}</p>
                    <p className="text-sm text-muted-foreground">by {selectedBook.author}</p>
                    <div className="mt-2 flex items-center gap-2">
                      <Badge variant={selectedBook.availableCopies > 0 ? "default" : "destructive"}>
                        {selectedBook.availableCopies} available
                      </Badge>
                      <Badge variant="outline">{selectedBook.category}</Badge>
                    </div>
                  </div>
                </div>
              )}

              <Button type="submit" className="w-full">
                Submit Reservation
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* My Reservations */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <BookOpen className="h-5 w-5 text-primary" />
              My Reservations
            </CardTitle>
            <CardDescription>
              Your current and past reservations
            </CardDescription>
          </CardHeader>
          <CardContent>
            {reservations.length === 0 ? (
              <div className="rounded-lg bg-muted/50 p-8 text-center">
                <Calendar className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">
                  You don&apos;t have any reservations yet.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Book</TableHead>
                      <TableHead>Dates</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead></TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reservations.map((reservation) => (
                      <TableRow key={reservation.id}>
                        <TableCell className="font-medium">
                          {reservation.bookTitle}
                        </TableCell>
                        <TableCell>
                          <div className="text-sm">
                            <p>{reservation.startDate}</p>
                            <p className="text-muted-foreground">to {reservation.endDate}</p>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              reservation.status === "pending"
                                ? "default"
                                : reservation.status === "confirmed"
                                ? "secondary"
                                : reservation.status === "cancelled"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {reservation.status}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {reservation.status === "pending" && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => cancelReservation(reservation.id)}
                              className="text-destructive hover:text-destructive"
                            >
                              Cancel
                            </Button>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}