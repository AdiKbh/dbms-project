"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { BookPlus, ArrowLeft } from "lucide-react"
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

const categories = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Romance",
  "Mystery",
  "Biography",
  "History",
  "Science",
  "Computer Science",
  "Philosophy",
  "Self-Help",
  "Children",
]

export default function AddBookPage() {
  const router = useRouter()
  const { addBook } = useLibrary()
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    isbn: "",
    category: "",
    totalCopies: "",
    publishedYear: "",
    description: "",
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    
    addBook({
      title: formData.title,
      author: formData.author,
      isbn: formData.isbn,
      category: formData.category,
      totalCopies: parseInt(formData.totalCopies) || 1,
      availableCopies: parseInt(formData.totalCopies) || 1,
      publishedYear: formData.publishedYear ? parseInt(formData.publishedYear) : undefined,
      description: formData.description || undefined,
    })

    router.push("/dashboard/admin/books")
  }

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  return (
    <div className="p-6 lg:p-8">
      <div className="mb-8">
        <Link
          href="/dashboard/admin/books"
          className="mb-4 inline-flex items-center text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Books
        </Link>
        <h1 className="text-3xl font-bold tracking-tight">Add New Book</h1>
        <p className="mt-1 text-muted-foreground">
          Add a new book to the library catalog
        </p>
      </div>

      <Card className="max-w-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <BookPlus className="h-5 w-5 text-primary" />
            Book Details
          </CardTitle>
          <CardDescription>
            Fill in the information below to add a new book
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="title">Title *</FieldLabel>
                <Input
                  id="title"
                  placeholder="Enter book title"
                  value={formData.title}
                  onChange={(e) => handleChange("title", e.target.value)}
                  required
                />
              </Field>

              <Field>
                <FieldLabel htmlFor="author">Author *</FieldLabel>
                <Input
                  id="author"
                  placeholder="Enter author name"
                  value={formData.author}
                  onChange={(e) => handleChange("author", e.target.value)}
                  required
                />
              </Field>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="isbn">ISBN *</FieldLabel>
                  <Input
                    id="isbn"
                    placeholder="978-0-000-00000-0"
                    value={formData.isbn}
                    onChange={(e) => handleChange("isbn", e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="category">Category *</FieldLabel>
                  <Select
                    value={formData.category}
                    onValueChange={(value) => handleChange("category", value)}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category} value={category}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </Field>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <Field>
                  <FieldLabel htmlFor="totalCopies">Total Copies *</FieldLabel>
                  <Input
                    id="totalCopies"
                    type="number"
                    min="1"
                    placeholder="Enter number of copies"
                    value={formData.totalCopies}
                    onChange={(e) => handleChange("totalCopies", e.target.value)}
                    required
                  />
                </Field>

                <Field>
                  <FieldLabel htmlFor="publishedYear">Published Year</FieldLabel>
                  <Input
                    id="publishedYear"
                    type="number"
                    min="1000"
                    max={new Date().getFullYear()}
                    placeholder="e.g., 2023"
                    value={formData.publishedYear}
                    onChange={(e) => handleChange("publishedYear", e.target.value)}
                  />
                </Field>
              </div>

              <Field>
                <FieldLabel htmlFor="description">Description</FieldLabel>
                <Textarea
                  id="description"
                  placeholder="Enter book description..."
                  value={formData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                  rows={4}
                />
              </Field>
            </FieldGroup>

            <div className="flex gap-4">
              <Button type="submit">Add Book</Button>
              <Link href="/dashboard/admin/books">
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