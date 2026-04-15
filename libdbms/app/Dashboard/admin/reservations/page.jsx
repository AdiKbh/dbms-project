"use client"

import { useState } from "react"
import { Search, Calendar, X } from "lucide-react"
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
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useLibrary } from "@/context/library-context"

export default function AdminReservationsPage() {
  const { reservations, cancelReservation } = useLibrary()
  const [searchQuery, setSearchQuery] = useState("")
  const [statusFilter, setStatusFilter] = useState("all")
  const [cancelDialogOpen, setCancelDialogOpen] = useState(false)
  const [selectedReservationId, setSelectedReservationId] = useState(null)

  const filteredReservations = reservations.filter((reservation) => {
    const matchesSearch =
      reservation.bookTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      reservation.memberName.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = statusFilter === "all" || reservation.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const handleCancelClick = (id) => {
    setSelectedReservationId(id)
    setCancelDialogOpen(true)
  }

  const handleCancelConfirm = () => {
    if (selectedReservationId) {
      cancelReservation(selectedReservationId)
      setCancelDialogOpen(false)
      setSelectedReservationId(null)
    }
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Reservations</h1>
        <p className="mt-1 text-muted-foreground">
          Manage book reservations made by members
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            Reservation List
          </CardTitle>
          <CardDescription>
            {filteredReservations.length} of {reservations.length} reservations
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
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="confirmed">Confirmed</SelectItem>
                <SelectItem value="cancelled">Cancelled</SelectItem>
                <SelectItem value="completed">Completed</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="rounded-lg border border-border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Book</TableHead>
                  <TableHead>Member</TableHead>
                  <TableHead>Reserved On</TableHead>
                  <TableHead>Start Date</TableHead>
                  <TableHead>End Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReservations.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={7} className="h-24 text-center">
                      No reservations found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredReservations.map((reservation) => (
                    <TableRow key={reservation.id}>
                      <TableCell className="font-medium">
                        {reservation.bookTitle}
                      </TableCell>
                      <TableCell>{reservation.memberName}</TableCell>
                      <TableCell>{reservation.reservationDate}</TableCell>
                      <TableCell>{reservation.startDate}</TableCell>
                      <TableCell>{reservation.endDate}</TableCell>
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
                      <TableCell className="text-right">
                        {reservation.status === "pending" && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancelClick(reservation.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <X className="mr-1 h-4 w-4" />
                            Cancel
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      <Dialog open={cancelDialogOpen} onOpenChange={setCancelDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Cancel Reservation</DialogTitle>
            <DialogDescription>
              Are you sure you want to cancel this reservation? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCancelDialogOpen(false)}>
              Keep Reservation
            </Button>
            <Button variant="destructive" onClick={handleCancelConfirm}>
              Cancel Reservation
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}