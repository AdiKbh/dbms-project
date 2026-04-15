"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { UserPlus, ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { useLibrary } from "@/context/library-context"

export default function AddMemberPage() {
  const router = useRouter()
  const { addMember, members } = useLibrary()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    status: "active",
  })

  const generateMembershipId = () => {
    const year = new Date().getFullYear()
    const number = (members.length + 1).toString().padStart(3, "0")
    return `STU-${year}-${number}`
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    addMember({
      name: formData.name,
      email: formData.email,
      membershipId: generateMembershipId(),
      phone: formData.phone,
      address: formData.address,
      joinDate: new Date().toISOString().split("T")[0],
      status: formData.status,
      booksIssued: 0,
    })

    router.push("/dashboard/admin/members")
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <Link
          href="/dashboard/admin/members"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Members
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Add New Member</h1>
        <p className="mt-1 text-muted-foreground">
          Register a new library member
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <UserPlus className="h-5 w-5 text-primary" />
            Member Details
          </CardTitle>
          <CardDescription>
            Fill in the information below to register a new member
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="name">Full Name *</FieldLabel>
                <Input
                  id="name"
                  placeholder="Enter member's full name"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="email">Email *</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter email address"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  required
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="phone">Phone Number *</FieldLabel>
                  <Input
                    id="phone"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => handleChange("phone", e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="status">Status</FieldLabel>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleChange("status", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="active">Active</SelectItem>
                      <SelectItem value="inactive">Inactive</SelectItem>
                      <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="address">Address *</FieldLabel>
                <Textarea
                  id="address"
                  placeholder="Enter member's address..."
                  value={formData.address}
                  onChange={(e) => handleChange("address", e.target.value)}
                  rows={3}
                  required
                />
              </Field>

              <div className="rounded-lg bg-muted p-4">
                <p className="text-sm text-muted-foreground">
                  <strong>Membership ID:</strong> {generateMembershipId()}
                </p>
                <p className="mt-1 text-xs text-muted-foreground">
                  This ID will be automatically assigned upon registration.
                </p>
              </div>
            </FieldGroup>

            <div className="flex gap-4">
              <Button type="submit">Add Member</Button>
              <Link href="/dashboard/admin/members">
                <Button type="button" variant="outline">
                  Cancel
                </Button>
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}