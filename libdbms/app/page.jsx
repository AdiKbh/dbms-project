"use client"

import Navbar from "@/components/navbar"
import HeroSection from "@/components/home/hero-section"
import FeaturesSection from "@/components/home/features-section"
import StatsSection from "@/components/home/stats-section"
import Footer from "@/components/footer"

export default function Page() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />

      <main className="flex-1">
        <HeroSection />
        <FeaturesSection />
        <StatsSection />
      </main>

      <Footer />
    </div>
  )
}