"use client"

import { createContext, useContext, useState } from "react"

const LibraryContext = createContext(undefined)

// Initial mock data
const initialBooks = [
  {
    id: "1",
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    isbn: "978-0-7432-7356-5",
    category: "Fiction",
    totalCopies: 5,
    availableCopies: 3,
    publishedYear: 1925,
    description: "A story of decadence and excess in the Jazz Age.",
  },
  {
    id: "2",
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    isbn: "978-0-06-112008-4",
    category: "Fiction",
    totalCopies: 8,
    availableCopies: 5,
    publishedYear: 1960,
    description: "A gripping tale of racial injustice and childhood innocence.",
  },
]

const initialMembers = [
  {
    id: "1",
    name: "John Student",
    email: "student@library.com",
    membershipId: "STU-2024-001",
    phone: "+1 234 567 8901",
    address: "123 Campus Drive, University City",
    joinDate: "2024-01-15",
    status: "active",
    booksIssued: 2,
  },
]

const initialTransactions = []
const initialReservations = []
const initialAchievements = []
const initialEvents = []

export function LibraryProvider({ children }) {
  const [books, setBooks] = useState(initialBooks)
  const [members, setMembers] = useState(initialMembers)
  const [transactions, setTransactions] = useState(initialTransactions)
  const [reservations, setReservations] = useState(initialReservations)
  const [achievements] = useState(initialAchievements)
  const [events] = useState(initialEvents)

  const addBook = (book) => {
    const newBook = {
      ...book,
      id: Date.now().toString(),
    }
    setBooks((prev) => [...prev, newBook])
  }

  const updateBook = (id, bookData) => {
    setBooks((prev) =>
      prev.map((book) =>
        book.id === id ? { ...book, ...bookData } : book
      )
    )
  }

  const deleteBook = (id) => {
    setBooks((prev) => prev.filter((book) => book.id !== id))
  }

  const addMember = (member) => {
    const newMember = {
      ...member,
      id: Date.now().toString(),
    }
    setMembers((prev) => [...prev, newMember])
  }

  const updateMember = (id, memberData) => {
    setMembers((prev) =>
      prev.map((member) =>
        member.id === id ? { ...member, ...memberData } : member
      )
    )
  }

  const deleteMember = (id) => {
    setMembers((prev) => prev.filter((member) => member.id !== id))
  }

  const issueBook = (bookId, memberId, dueDate) => {
    const book = books.find((b) => b.id === bookId)
    const member = members.find((m) => m.id === memberId)

    if (!book || !member || book.availableCopies <= 0) return false

    const newTransaction = {
      id: Date.now().toString(),
      bookId,
      bookTitle: book.title,
      memberId,
      memberName: member.name,
      type: "issue",
      issueDate: new Date().toISOString().split("T")[0],
      dueDate,
      status: "issued",
    }

    setTransactions((prev) => [...prev, newTransaction])
    updateBook(bookId, { availableCopies: book.availableCopies - 1 })
    updateMember(memberId, { booksIssued: member.booksIssued + 1 })

    return true
  }

  const returnBook = (transactionId) => {
    const transaction = transactions.find((t) => t.id === transactionId)
    if (!transaction || transaction.status !== "issued") return false

    const book = books.find((b) => b.id === transaction.bookId)
    const member = members.find((m) => m.id === transaction.memberId)

    if (!book || !member) return false

    const returnDate = new Date().toISOString().split("T")[0]

    setTransactions((prev) =>
      prev.map((t) =>
        t.id === transactionId
          ? { ...t, returnDate, status: "returned" }
          : t
      )
    )

    updateBook(transaction.bookId, { availableCopies: book.availableCopies + 1 })
    updateMember(transaction.memberId, {
      booksIssued: Math.max(0, member.booksIssued - 1),
    })

    return true
  }

  const reserveBook = (bookId, memberId, startDate, endDate) => {
    const book = books.find((b) => b.id === bookId)
    const member = members.find((m) => m.id === memberId)

    if (!book || !member) return false

    const newReservation = {
      id: Date.now().toString(),
      bookId,
      bookTitle: book.title,
      memberId,
      memberName: member.name,
      reservationDate: new Date().toISOString().split("T")[0],
      startDate,
      endDate,
      status: "pending",
    }

    setReservations((prev) => [...prev, newReservation])
    return true
  }

  const cancelReservation = (reservationId) => {
    setReservations((prev) =>
      prev.map((r) =>
        r.id === reservationId ? { ...r, status: "cancelled" } : r
      )
    )
  }

  const getBookById = (id) => books.find((b) => b.id === id)
  const getMemberById = (id) => members.find((m) => m.id === id)
  const getMemberTransactions = (memberId) =>
    transactions.filter((t) => t.memberId === memberId)
  const getMemberReservations = (memberId) =>
    reservations.filter((r) => r.memberId === memberId)

  return (
    <LibraryContext.Provider
      value={{
        books,
        members,
        transactions,
        reservations,
        achievements,
        events,
        addBook,
        updateBook,
        deleteBook,
        addMember,
        updateMember,
        deleteMember,
        issueBook,
        returnBook,
        reserveBook,
        cancelReservation,
        getBookById,
        getMemberById,
        getMemberTransactions,
        getMemberReservations,
      }}
    >
      {children}
    </LibraryContext.Provider>
  )
}

export function useLibrary() {
  const context = useContext(LibraryContext)

  if (context === undefined) {
    throw new Error("useLibrary must be used within a LibraryProvider")
  }

  return context
}