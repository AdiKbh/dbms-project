

import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/context/auth-context"
import { LibraryProvider } from "@/context/library-context"
import "./globals.css"

const geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
})

const geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} bg-background`}>
      <head>
        <title>LibraryMS - Library Management System</title>
        <meta
          name="description"
          content="A comprehensive library management system for managing books, members, transactions, and more."
        />
        <meta name="generator" content="v0.app" />
        <link
          rel="icon"
          href="/icon-light-32x32.png"
          media="(prefers-color-scheme: light)"
        />
        <link
          rel="icon"
          href="/icon-dark-32x32.png"
          media="(prefers-color-scheme: dark)"
        />
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="apple-touch-icon" href="/apple-icon.png" />
        <meta
          name="theme-color"
          content="#f8fafc"
          media="(prefers-color-scheme: light)"
        />
        <meta
          name="theme-color"
          content="#0f172a"
          media="(prefers-color-scheme: dark)"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className="font-sans antialiased">
        <AuthProvider>
          <LibraryProvider>
            {children}
          </LibraryProvider>
        </AuthProvider>
        {process.env.NODE_ENV === "production" && <Analytics />}
      </body>
    </html>
  )
}