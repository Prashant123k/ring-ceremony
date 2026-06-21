'use client'

import { useState } from "react"
import IntroLoader from "@/components/IntroLoader"
import Hero from "@/components/Hero"
import FamilyBlessings from "@/components/FamilyBlessings"
import CoupleStory from "@/components/CoupleStory"
import PhotoGallery from "@/components/PhotoGallery"
import EventDetails from "@/components/EventDetails"
import Timeline from "@/components/Timeline"
import Countdown from "@/components/Countdown"
import Location from "@/components/Location"
import Blessings from "@/components/Blessings"
import GrandFinale from "@/components/GrandFinale"
import FloatingNav from "@/components/FloatingNav"
import Footer from "@/components/Footer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <>
      {/* 1. Luxury Loader Screen */}
      <IntroLoader onComplete={() => setIsLoading(false)} />
      
      {/* Main Single Page Content (Loads only after loader finishes for proper motion timing) */}
      {!isLoading && (
        <div className="flex flex-col min-h-screen relative">
          {/* 2. Hero Section */}
          <Hero />

          {/* 3. Family Blessings */}
          <FamilyBlessings />

          {/* 4. Couple Story */}
          <CoupleStory />

          {/* 5. Photo Gallery */}
          <PhotoGallery />

          {/* 6. Event Details */}
          <EventDetails />

          {/* 7. Celebration Timeline */}
          <Timeline />

          {/* 8. Live Countdown */}
          <Countdown />

          {/* 9. Venue Location details */}
          <Location />

          {/* 10. Warm Wishes & Blessings */}
          <Blessings />

          {/* 11. Grand Finale */}
          <GrandFinale />

          {/* Floating Dot Menu */}
          <FloatingNav />

          {/* Footer */}
          <Footer />
        </div>
      )}
    </>
  )
}
