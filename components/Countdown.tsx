'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [isMounted, setIsMounted] = useState(false)

  // Target Date: 19 July 2026 5:00 PM IST
  // IST is UTC+5:30
  const TARGET_DATE = new Date('2026-07-19T17:00:00+05:30').getTime()

  useEffect(() => {
    setIsMounted(true)

    const calculateTimeLeft = () => {
      const difference = TARGET_DATE - new Date().getTime()
      
      if (difference <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0 }
      }

      return {
        days: Math.floor(difference / (1000 * 60 * 60 * 24)),
        hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((difference / 1000 / 60) % 60),
        seconds: Math.floor((difference / 1000) % 60)
      }
    }

    // Set initial calculations
    setTimeLeft(calculateTimeLeft())

    const timer = setInterval(() => {
      setTimeLeft(calculateTimeLeft())
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  if (!isMounted) {
    // Avoid Server-Client Hydration mismatches by rendering a placeholder
    return (
      <section className="relative min-h-[40vh] w-full flex items-center justify-center bg-gradient-to-b from-[#3d0813] to-maroon py-16 px-6">
        <div className="text-[#FFFDF7] font-subheading text-lg tracking-widest animate-pulse">
          Initializing Countdown...
        </div>
      </section>
    )
  }

  const timeBlocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds }
  ]

  return (
    <section 
      id="countdown"
      className="relative min-h-[45vh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-[#3d0813] to-maroon py-20 px-6 overflow-hidden"
    >
      {/* Background Subtle Shimmer */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(214,175,55,0.04),transparent_60%)] pointer-events-none" />

      {/* Header */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-12 relative z-10"
      >
        <h2 className="text-sm md:text-base font-subheading uppercase tracking-[0.25em] text-gold-soft mb-2 font-medium">
          Counting Down to Forever
        </h2>
        <div className="w-12 h-[1px] bg-gold mx-auto" />
      </motion.div>

      {/* Grid of countdown cards */}
      <div className="grid grid-cols-4 gap-3 sm:gap-6 max-w-3xl w-full relative z-10">
        {timeBlocks.map((block, idx) => (
          <motion.div
            key={block.label}
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: idx * 0.1 }}
            className="flex flex-col items-center"
          >
            {/* Countdown card */}
            <div className="relative w-full aspect-square md:aspect-auto md:w-32 md:h-36 rounded-xl bg-[#2a050d] border border-gold/25 flex flex-col items-center justify-center shadow-lg overflow-hidden group">
              {/* Card top/bottom subtle division line */}
              <div className="absolute inset-x-0 top-1/2 h-[1px] bg-black/40 z-10" />

              {/* Number display */}
              <div className="relative h-12 md:h-16 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="popLayout">
                  <motion.span
                    key={block.value}
                    initial={{ y: 25, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    exit={{ y: -25, opacity: 0 }}
                    transition={{ duration: 0.4, ease: "easeInOut" }}
                    className="block text-3xl md:text-5xl font-heading font-black text-gold tracking-tight"
                  >
                    {String(block.value).padStart(2, '0')}
                  </motion.span>
                </AnimatePresence>
              </div>

              {/* Label inside the card */}
              <span className="absolute bottom-2 md:bottom-3 text-[10px] md:text-xs uppercase tracking-widest font-subheading font-medium text-gold-soft/70">
                {block.label}
              </span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
