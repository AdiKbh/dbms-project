"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { BookOpen, Eye, EyeOff, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { useAuth } from "@/context/auth-context"
import { Spinner } from "@/components/ui/spinner"

export default function AdminLoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState("")
  const { login, isLoading } = useAuth()
  const router = useRouter()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError("")

    const success = await login(email, password, "admin")
    if (success) {
      router.push("/dashboard/admin")
    } else {
      setError("Invalid credentials. Please try again.")
    }
  }

  return (
    <div className="flex min-h-screen">
      {/* Left Panel */}
      <div className="hidden flex-1 flex-col justify-between bg-sidebar p-12 lg:flex">
        <Link href="/" className="flex items-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-sidebar-primary">
            <BookOpen className="h-5 w-5 text-sidebar-primary-foreground" />
          </div>
          <span className="text-xl font-bold text-sidebar-foreground">LibraryMS</span>
        </Link>

        <div>
          <blockquote className="space-y-2">
            <p className="text-lg text-sidebar-foreground/90">
              &ldquo;This library management system has transformed how we handle our daily operations. 
              The admin dashboard provides all the tools we need in one place.&rdquo;
            </p>
            <footer className="text-sm text-sidebar-foreground/60">
              - Head Librarian
            </footer>
          </blockquote>
        </div>
      </div>

      {/* Right Panel */}
      <div className="flex flex-1 items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="flex flex-col items-center lg:hidden">
            <Link href="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
                <BookOpen className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">LibraryMS</span>
            </Link>
          </div>

          <Card className="border-border">
            <CardHeader className="space-y-1">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/10">
                  <Shield className="h-4 w-4 text-primary" />
                </div>
                <CardTitle className="text-2xl">Admin Login</CardTitle>
              </div>
              <CardDescription>
                Enter your credentials to access the admin dashboard
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">
                    {error}
                  </div>
                )}

                <FieldGroup>
                  <Field>
                    <FieldLabel htmlFor="email">Email</FieldLabel>
                    <Input
                      id="email"
                      type="email"
                      placeholder="admin@library.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </Field>

                  <Field>
                    <FieldLabel htmlFor="password">Password</FieldLabel>
                    <div className="relative">
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </button>
                    </div>
                  </Field>
                </FieldGroup>

                <Button type="submit" className="w-full" disabled={isLoading}>
                  {isLoading ? <Spinner className="mr-2 h-4 w-4" /> : null}
                  Sign In
                </Button>

                <div className="rounded-md bg-muted p-3 text-sm">
                  <p className="font-medium">Demo Credentials:</p>
                  <p className="text-muted-foreground">Email: admin@library.com</p>
                  <p className="text-muted-foreground">Password: admin123</p>
                </div>
              </form>

              <div className="mt-6 text-center text-sm">
                <span className="text-muted-foreground">Are you a student? </span>
                <Link href="/auth/student-login" className="font-medium text-primary hover:underline">
                  Student Login
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}