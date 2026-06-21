'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { Heart, Sparkles, Utensils } from 'lucide-react'

interface TimelineEvent {
  time: string
  title: string
  desc: string
  icon: React.ReactNode
}

export default function Timeline() {
  const containerRef = useRef<HTMLDivElement>(null)

  const events: TimelineEvent[] = [
    {
      time: '5:00 PM',
      title: 'Guest Arrival',
      desc: 'Welcoming our esteemed guests with traditional greetings and soft drinks.',
      icon: <Sparkles className="w-5 h-5 text-gold" />
    },
    {
      time: '5:30 PM',
      title: 'Ring Exchange',
      desc: 'The auspicious moment where we pledge our love and exchange rings.',
      icon: <Heart className="w-5 h-5 text-gold" />
    },
    {
      time: '7:00 PM',
      title: 'Dinner & Celebration',
      desc: 'Savoring delicious traditional cuisines and celebrating with music and dance.',
      icon: <Utensils className="w-5 h-5 text-gold" />
    }
  ]

  // Track scroll progress to draw the line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  })

  // Scale the height of the line based on scroll progress
  const lineHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])

  return (
    <section 
      id="timeline"
      ref={containerRef}
      className="relative min-h-screen w-full bg-luxury py-24 px-6 overflow-hidden border-b border-gold/10"
    >
      {/* Header */}
      <div className="text-center mb-20">
        <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-maroon font-heading mb-4">
          Celebration Timeline
        </h2>
        <p className="text-sm md:text-base font-subheading text-gold tracking-widest uppercase">
          The flow of our special evening
        </p>
      </div>

      {/* Timeline Structure Wrapper */}
      <div className="relative max-w-4xl mx-auto">
        {/* Background Grey/Gold Path Line (Dotted background) */}
        <div className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 bottom-0 w-[2px] bg-gold/10 border-l border-dashed border-gold/20" />

        {/* Scroll-Linked Drawing Gold Line */}
        <motion.div 
          style={{ height: lineHeight }}
          className="absolute left-4 md:left-1/2 md:-translate-x-1/2 top-0 w-[2px] bg-gradient-to-b from-maroon via-gold to-gold-soft origin-top"
        />

        {/* Timeline Events List */}
        <div className="space-y-16 relative">
          {events.map((event, idx) => {
            const isEven = idx % 2 === 0
            
            return (
              <div 
                key={idx}
                className="flex flex-col md:flex-row items-start md:items-center relative"
              >
                {/* Responsive spacing & direction alignment */}
                {/* Desktop: Alternates left and right sides. Mobile: Left aligned details. */}
                <div className={`w-full md:w-1/2 flex ${isEven ? 'md:justify-end md:pr-12' : 'md:order-last md:pl-12'} pl-12 md:pl-0`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? -40 : 40, y: 10 }}
                    whileInView={{ opacity: 1, x: 0, y: 0 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                    className="w-full max-w-md bg-white border border-gold/15 rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300 relative"
                  >
                    {/* Tiny arrow pointing to center line */}
                    <div className={`hidden md:block absolute top-1/2 -translate-y-1/2 w-3 h-3 bg-white border-t border-l border-gold/15 rotate-45 ${
                      isEven ? '-right-[7px] border-r-0 border-b-0 rotate-135' : '-left-[7px] border-r-0 border-b-0 -rotate-45'
                    }`} />

                    <span className="text-sm font-subheading font-bold text-gold tracking-widest uppercase">
                      {event.time}
                    </span>
                    <h3 className="text-xl md:text-2xl font-subheading text-maroon font-semibold mt-1 mb-2">
                      {event.title}
                    </h3>
                    <p className="text-sm text-dark/70 font-light leading-relaxed">
                      {event.desc}
                    </p>
                  </motion.div>
                </div>

                {/* Central Circle Node */}
                <motion.div 
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 300, damping: 20, delay: 0.2 }}
                  className="absolute left-[7px] md:left-1/2 md:-translate-x-1/2 top-0 md:top-auto w-8 h-8 rounded-full border border-gold bg-maroon flex items-center justify-center shadow-lg z-20"
                >
                  <div className="flex items-center justify-center">
                    {event.icon}
                  </div>
                </motion.div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
