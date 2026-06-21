'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const NAV_ITEMS = [
  { id: 'home', label: 'Home', symbol: '⌂' },
  { id: 'family', label: 'Family', symbol: '♥' },
  { id: 'story', label: 'Story', symbol: '✦' },
  { id: 'gallery', label: 'Gallery', symbol: '◈' },
  { id: 'details', label: 'Details', symbol: '◉' },
  { id: 'timeline', label: 'Timeline', symbol: '◷' },
  { id: 'countdown', label: 'Countdown', symbol: '◎' },
  { id: 'location', label: 'Location', symbol: '◆' },
]

export default function FloatingNav() {
  const [active, setActive] = useState('home')
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 100)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
      },
      { rootMargin: '-25% 0px -60% 0px', threshold: 0.1 }
    )
    NAV_ITEMS.forEach(item => {
      const el = document.getElementById(item.id)
      if (el) obs.observe(el)
    })
    return () => obs.disconnect()
  }, [])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.4 }}
          className="fixed right-5 md:right-7 top-1/2 -translate-y-1/2 z-50
            hidden md:flex flex-col items-center gap-1.5"
        >
          {/* Nav container */}
          <div
            className="flex flex-col items-center gap-1 py-3 px-2 rounded-full"
            style={{
              background: 'rgba(61,8,19,0.75)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201,168,76,0.15)',
              boxShadow: '0 8px 32px rgba(0,0,0,0.3)'
            }}
          >
            {NAV_ITEMS.map((item) => {
              const isActive = active === item.id
              return (
                <div key={item.id} className="group relative flex items-center">
                  {/* Tooltip */}
                  <motion.span
                    initial={false}
                    animate={{ opacity: 0, x: 0 }}
                    whileHover={{ opacity: 0 }}
                    className="absolute right-full mr-3 px-3 py-1 rounded-full
                      font-subheading text-xs tracking-wider text-gold-soft
                      bg-maroon/90 border border-gold/20 shadow-lg
                      opacity-0 group-hover:opacity-100 transition-all duration-200
                      pointer-events-none whitespace-nowrap select-none"
                    style={{ backdropFilter: 'blur(8px)' }}
                  >
                    {item.label}
                  </motion.span>

                  <button
                    onClick={() => scrollTo(item.id)}
                    className="relative w-8 h-8 flex items-center justify-center cursor-pointer group"
                    aria-label={`Go to ${item.label}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="navActive"
                        className="absolute inset-0 rounded-full bg-gold/10 border border-gold/40"
                        transition={{ type: 'spring', stiffness: 350, damping: 28 }}
                      />
                    )}
                    <span
                      className={`relative text-base transition-all duration-300 leading-none
                        ${isActive ? 'text-gold scale-110' : 'text-gold/25 group-hover:text-gold/60 group-hover:scale-105'}`}
                    >
                      {isActive ? '●' : '○'}
                    </span>
                  </button>
                </div>
              )
            })}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
