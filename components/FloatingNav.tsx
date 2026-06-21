'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface NavItem {
  id: string
  label: string
}

const NAV_ITEMS: NavItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'story', label: 'Story' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'details', label: 'Details' },
  { id: 'timeline', label: 'Timeline' },
  { id: 'location', label: 'Location' }
]

export default function FloatingNav() {
  const [activeSection, setActiveSection] = useState('home')

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '-30% 0px -50% 0px', // Trigger when section occupies center of viewport
      threshold: 0.1
    }

    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id)
        }
      })
    }

    const observer = new IntersectionObserver(handleIntersection, observerOptions)

    NAV_ITEMS.forEach((item) => {
      const element = document.getElementById(item.id)
      if (element) {
        observer.observe(element)
      }
    })

    return () => {
      observer.disconnect()
    }
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <div className="fixed right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col space-y-4">
      {NAV_ITEMS.map((item) => {
        const isActive = activeSection === item.id

        return (
          <div key={item.id} className="group relative flex items-center justify-end">
            {/* Label revealed on hover */}
            <span className="absolute right-8 px-2.5 py-1 text-xs uppercase tracking-widest font-subheading font-medium bg-maroon text-gold-soft border border-gold/30 rounded shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
              {item.label}
            </span>

            {/* Nav Dot */}
            <button
              onClick={() => scrollToSection(item.id)}
              className="relative w-4 h-4 flex items-center justify-center cursor-pointer"
            >
              {/* Outer ring for active state */}
              {isActive && (
                <motion.div
                  layoutId="activeDotOuter"
                  className="absolute inset-0 rounded-full border border-gold bg-gold/5"
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                />
              )}

              {/* Inner filled dot */}
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                  isActive ? 'bg-gold' : 'bg-gold/35 group-hover:bg-gold/70'
                }`}
              />
            </button>
          </div>
        )
      })}
    </div>
  )
}
