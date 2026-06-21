'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

const TARGET_DATE = new Date('2026-07-19T17:00:00+05:30').getTime()

function calcTimeLeft(): TimeLeft {
  const diff = TARGET_DATE - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / 1000 / 60) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

interface BlockProps {
  value: number
  label: string
  index: number
}

function TimeBlock({ value, label, index }: BlockProps) {
  const display = String(value).padStart(2, '0')

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7, delay: index * 0.1 }}
      className="flex flex-col items-center gap-3"
    >
      {/* Card */}
      <div
        className="relative overflow-hidden rounded-2xl flex flex-col items-center justify-center shadow-xl"
        style={{
          width: 'clamp(72px, 20vw, 120px)',
          height: 'clamp(80px, 22vw, 140px)',
          background: 'linear-gradient(160deg, #2a050d 0%, #1e0309 100%)',
          border: '1px solid rgba(201,168,76,0.2)',
          boxShadow: '0 20px 60px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,168,76,0.04) inset'
        }}
      >
        {/* Top shine */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] pointer-events-none"
          style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.3), transparent)' }}
        />

        {/* Fold line */}
        <div
          className="absolute inset-x-0 top-1/2 h-[1px] z-10"
          style={{ background: 'rgba(0,0,0,0.4)' }}
        />

        {/* Digit with flip animation */}
        <div
          className="relative flex items-center justify-center"
          style={{ height: 'clamp(48px, 14vw, 80px)' }}
        >
          <AnimatePresence mode="popLayout">
            <motion.span
              key={display}
              initial={{ rotateX: 90, opacity: 0 }}
              animate={{ rotateX: 0, opacity: 1 }}
              exit={{ rotateX: -90, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="block font-heading font-black text-gold"
              style={{
                fontSize: 'clamp(2rem, 8vw, 3.5rem)',
                lineHeight: 1,
                textShadow: '0 0 20px rgba(201,168,76,0.3)',
                transformOrigin: 'center center',
              }}
            >
              {display}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Label */}
      <span
        className="text-label font-subheading font-medium text-gold-soft/70 tracking-[0.2em]"
        style={{ fontSize: 'clamp(0.55rem, 1.5vw, 0.75rem)' }}
      >
        {label}
      </span>
    </motion.div>
  )
}

export default function Countdown() {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({ days: 0, hours: 0, minutes: 0, seconds: 0 })
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
    setTimeLeft(calcTimeLeft())
    const id = setInterval(() => setTimeLeft(calcTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const blocks = [
    { label: 'Days', value: timeLeft.days },
    { label: 'Hours', value: timeLeft.hours },
    { label: 'Minutes', value: timeLeft.minutes },
    { label: 'Seconds', value: timeLeft.seconds },
  ]

  return (
    <section
      id="countdown"
      className="relative w-full overflow-hidden"
      style={{
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        background: 'linear-gradient(170deg, #3d0813 0%, #4a0c18 50%, #3d0813 100%)'
      }}
    >
      {/* Radial ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 50%, rgba(201,168,76,0.05), transparent)'
        }}
      />

      {/* Top line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-12 md:mb-16"
        >
          <p className="text-label font-subheading text-gold-soft/60 tracking-[0.25em] mb-4">
            ✦ &nbsp; Save the Date &nbsp; ✦
          </p>
          <h2 className="text-section-title font-heading font-bold text-cream">
            Counting Down
          </h2>
          <div className="h-[1px] w-24 mx-auto mt-5 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
          <p className="font-subheading italic text-xl md:text-2xl text-gold-soft/60 mt-5 font-light">
            to the beginning of forever
          </p>
        </motion.div>

        {/* Countdown blocks */}
        {mounted ? (
          <div className="flex items-start justify-center gap-4 sm:gap-6 md:gap-10">
            {blocks.map((block, i) => (
              <TimeBlock key={block.label} value={block.value} label={block.label} index={i} />
            ))}
          </div>
        ) : (
          <div className="flex justify-center gap-4 sm:gap-6">
            {[0, 1, 2, 3].map(i => (
              <div
                key={i}
                className="rounded-2xl bg-white/5 animate-pulse"
                style={{ width: 'clamp(72px, 20vw, 120px)', height: 'clamp(80px, 22vw, 140px)' }}
              />
            ))}
          </div>
        )}

        {/* Date subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.6 }}
          className="text-center mt-10 font-subheading text-lg text-gold-soft/40 tracking-widest uppercase font-light"
        >
          19 July 2026 &nbsp;·&nbsp; Shajapur, M.P.
        </motion.p>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  )
}
