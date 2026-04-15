"use client"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"

const AuthContext = createContext(undefined)

// Mock users for demo
const mockUsers = {
  "admin@library.com": {
    id: "1",
    name: "Admin User",
    email: "admin@library.com",
    role: "admin",
    password: "admin123",
    avatar: "/avatars/admin.jpg",
  },
  "student@library.com": {
    id: "2",
    name: "John Student",
    email: "student@library.com",
    role: "student",
    password: "student123",
    membershipId: "STU-2024-001",
    avatar: "/avatars/student.jpg",
  },
}

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const storedUser = localStorage.getItem("library_user")
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser))
      } catch {
        localStorage.removeItem("library_user")
      }
    }
    setIsLoading(false)
  }, [])

  const login = async (email, password, role) => {
    setIsLoading(true)

    await new Promise((resolve) => setTimeout(resolve, 1000))

    const mockUser = mockUsers[email]

    if (mockUser && mockUser.password === password && mockUser.role === role) {
      const { password: _, ...userWithoutPassword } = mockUser

      setUser(userWithoutPassword)
      localStorage.setItem("library_user", JSON.stringify(userWithoutPassword))
      setIsLoading(false)

      return true
    }

    setIsLoading(false)
    return false
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("library_user")
    router.push("/")
  }

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const context = useContext(AuthContext)

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }

  return context
}