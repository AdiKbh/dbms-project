"use client"

import { useState } from "react"
import { Search, BookOpen, Filter } from "lucide-react"
import Navbar from "@/components/navbar" 
import Footer from "@/components/footer" 
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
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
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { useLibrary } from "@/context/library-context"

export default function LibraryBooksPage() {
  const { books } = useLibrary()
  const [searchQuery, setSearchQuery] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [selectedBook, setSelectedBook] = useState(null)

  const categories = Array.from(new Set(books.map((book) => book.category)))

  const filteredBooks = books.filter((book) => {
    const matchesSearch =
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.isbn.includes(searchQuery)
    const matchesCategory = categoryFilter === "all" || book.category === categoryFilter
    return matchesSearch && matchesCategory
  })

  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight">Book Catalog</h1>
            <p className="mt-2 text-muted-foreground">
              Browse our collection of {books.length} books across {categories.length} categories
            </p>
          </div>

          {/* Filters */}
          <div className="mb-8 flex flex-col gap-4 sm:flex-row">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search by title, author, or ISBN..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Results count */}
          <p className="mb-4 text-sm text-muted-foreground">
            Showing {filteredBooks.length} of {books.length} books
          </p>

          {/* Book Grid */}
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredBooks.length === 0 ? (
              <div className="col-span-full rounded-lg bg-muted/50 p-12 text-center">
                <BookOpen className="mx-auto h-12 w-12 text-muted-foreground/50" />
                <p className="mt-4 text-muted-foreground">No books found matching your search.</p>
              </div>
            ) : (
              filteredBooks.map((book) => (
                <Card
                  key={book.id}
                  className="cursor-pointer transition-all hover:shadow-lg"
                  onClick={() => setSelectedBook(book)}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="line-clamp-1 text-lg">{book.title}</CardTitle>
                        <CardDescription className="mt-1">{book.author}</CardDescription>
                      </div>
                      <Badge
                        variant={book.availableCopies > 0 ? "default" : "destructive"}
                        className="ml-2 shrink-0"
                      >
                        {book.availableCopies > 0 ? "Available" : "Unavailable"}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between text-sm">
                      <Badge variant="outline">{book.category}</Badge>
                      <span className="text-muted-foreground">
                        {book.availableCopies}/{book.totalCopies} copies
                      </span>
                    </div>
                    {book.publishedYear && (
                      <p className="mt-2 text-xs text-muted-foreground">
                        Published: {book.publishedYear}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </main>
      <Footer />

      {/* Book Detail Dialog */}
      <Dialog open={!!selectedBook} onOpenChange={() => setSelectedBook(null)}>
        <DialogContent className="max-w-lg">
          {selectedBook && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedBook.title}</DialogTitle>
                <DialogDescription>by {selectedBook.author}</DialogDescription>
              </DialogHeader>
              <div className="space-y-4">
                <div className="flex flex-wrap gap-2">
                  <Badge variant="outline">{selectedBook.category}</Badge>
                  <Badge
                    variant={selectedBook.availableCopies > 0 ? "default" : "destructive"}
                  >
                    {selectedBook.availableCopies > 0
                      ? `${selectedBook.availableCopies} available`
                      : "Unavailable"}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 gap-4 rounded-lg bg-muted/50 p-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">ISBN</p>
                    <p className="font-mono">{selectedBook.isbn}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Total Copies</p>
                    <p>{selectedBook.totalCopies}</p>
                  </div>
                  {selectedBook.publishedYear && (
                    <div>
                      <p className="text-muted-foreground">Published</p>
                      <p>{selectedBook.publishedYear}</p>
                    </div>
                  )}
                </div>

                {selectedBook.description && (
                  <div>
                    <p className="mb-2 text-sm font-medium text-muted-foreground">Description</p>
                    <p className="text-sm">{selectedBook.description}</p>
                  </div>
                )}

                <div className="flex gap-2">
                  <Button className="flex-1" disabled={selectedBook.availableCopies === 0}>
                    {selectedBook.availableCopies > 0 ? "Request to Borrow" : "Not Available"}
                  </Button>
                  <Button variant="outline" onClick={() => setSelectedBook(null)}>
                    Close
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}