'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Sparkles, Utensils, Music } from 'lucide-react'

interface TimelineEvent {
  time: string
  title: string
  desc: string
  icon: React.ReactNode
}

const EVENTS: TimelineEvent[] = [
  {
    time: '5:00 PM',
    title: 'Guest Arrival',
    desc: 'Welcoming our beloved guests with warm traditional greetings, refreshments, and the joy of togetherness.',
    icon: <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-gold" />
  },
  {
    time: '5:30 PM',
    title: 'Ring Exchange',
    desc: 'The most auspicious moment — where two souls pledge their love and exchange rings in front of loved ones.',
    icon: <Heart className="w-4 h-4 md:w-5 md:h-5 text-gold" />
  },
  {
    time: '6:30 PM',
    title: 'Music & Dance',
    desc: 'Celebrate with joyful music and dance, filling the evening with laughter and cherished memories.',
    icon: <Music className="w-4 h-4 md:w-5 md:h-5 text-gold" />
  },
  {
    time: '7:30 PM',
    title: 'Dinner & Celebration',
    desc: 'Indulge in a lavish spread of traditional cuisines, ending a perfect evening with heartfelt warmth.',
    icon: <Utensils className="w-4 h-4 md:w-5 md:h-5 text-gold" />
  }
]

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 30%']
  })

  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative w-full overflow-hidden section-sep"
      style={{
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        background: 'linear-gradient(180deg, var(--background) 0%, #faf6ea 100%)'
      }}
    >
      {/* Background ambiance */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 70% at 50% 30%, rgba(107,16,34,0.02), transparent)'
        }}
      />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-label font-subheading text-gold tracking-[0.25em] mb-4">
            ✦ &nbsp; The Evening Plan &nbsp; ✦
          </p>
          <h2 className="text-section-title font-heading font-bold text-maroon">
            Celebration Timeline
          </h2>
          <div className="gold-line w-24 mx-auto mt-5" />
        </motion.div>

        {/* Timeline container */}
        <div className="relative max-w-3xl mx-auto">
          {/* Background dashed line — mobile: left side, desktop: center */}
          <div
            className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px]"
            style={{ borderLeft: '2px dashed rgba(201,168,76,0.12)' }}
          />

          {/* Scroll-animated gold fill line */}
          <motion.div
            style={{ height: lineHeight }}
            className="absolute left-7 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] origin-top
              bg-gradient-to-b from-maroon via-gold to-gold-soft"
          />

          {/* Events */}
          <div className="space-y-10 md:space-y-16">
            {EVENTS.map((event, idx) => {
              const isEven = idx % 2 === 0

              return (
                <div key={idx} className="relative">

                  {/* ══ MOBILE LAYOUT: icon left + card right, both in flow ══ */}
                  <div className="flex items-start gap-3 md:hidden pl-0">
                    {/* Spacer to push icon on top of the line */}
                    <div className="flex-shrink-0 w-14 flex justify-center pt-1">
                      <motion.div
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        viewport={{ once: true, margin: '-30px' }}
                        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                        className="w-10 h-10 rounded-full flex-shrink-0
                          bg-maroon border-2 border-gold/50 flex items-center justify-center
                          shadow-md shadow-maroon/25 z-10"
                      >
                        {event.icon}
                      </motion.div>
                    </div>

                    {/* Card */}
                    <motion.div
                      initial={{ opacity: 0, x: 16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-30px' }}
                      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                      className="flex-1 bg-white rounded-2xl p-4
                        border border-gold/15 shadow-sm min-w-0"
                    >
                      <span className="text-label tracking-[0.18em] text-gold font-subheading font-bold block mb-2">
                        {event.time}
                      </span>
                      <h3 className="font-subheading text-lg font-semibold text-maroon mb-1.5 leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-sm text-dark/55 font-light leading-relaxed">
                        {event.desc}
                      </p>
                    </motion.div>
                  </div>

                  {/* ══ DESKTOP LAYOUT: alternating left/right, center absolute icon ══ */}
                  <div className="hidden md:flex items-center relative">
                    {/* Content card */}
                    <div className={`w-[calc(50%-2rem)] ${isEven ? 'mr-auto pr-10' : 'ml-auto pl-10'}`}>
                      <motion.div
                        initial={{ opacity: 0, x: isEven ? -30 : 30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, margin: '-60px' }}
                        transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                        className="relative bg-white rounded-2xl p-7
                          border border-gold/12 shadow-sm
                          hover:shadow-md hover:border-gold/25 transition-all duration-300 group"
                      >
                        {/* Arrow connector to center line */}
                        <div
                          className={`absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white
                            border border-gold/15 rotate-45 group-hover:border-gold/30 transition-colors duration-300
                            ${isEven ? '-right-[7px] border-l-0 border-b-0' : '-left-[7px] border-r-0 border-t-0'}`}
                        />
                        <span className="text-label tracking-[0.18em] text-gold font-subheading font-bold block mb-3">
                          {event.time}
                        </span>
                        <h3 className="font-subheading text-2xl font-semibold text-maroon mb-2 leading-tight">
                          {event.title}
                        </h3>
                        <p className="text-base text-dark/60 font-light leading-relaxed">
                          {event.desc}
                        </p>
                      </motion.div>
                    </div>

                    {/* Desktop center icon node */}
                    <motion.div
                      initial={{ scale: 0, opacity: 0 }}
                      whileInView={{ scale: 1, opacity: 1 }}
                      viewport={{ once: true, margin: '-40px' }}
                      transition={{ type: 'spring', stiffness: 280, damping: 22, delay: 0.05 }}
                      className="absolute left-1/2 -translate-x-1/2
                        w-11 h-11 rounded-full
                        bg-maroon border-2 border-gold/50 flex items-center justify-center
                        shadow-lg shadow-maroon/20 z-20 animate-pulse-glow"
                    >
                      {event.icon}
                    </motion.div>
                  </div>

                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
