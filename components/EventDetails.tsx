'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Home, MapPin } from 'lucide-react'

const DETAILS = [
  {
    icon: Calendar,
    label: 'Date',
    value: '19 July 2026',
    sub: 'Sunday'
  },
  {
    icon: Clock,
    label: 'Time',
    value: '5:00 PM onwards',
    sub: 'Indian Standard Time'
  },
  {
    icon: Home,
    label: 'Venue',
    value: 'Home Function',
    sub: 'Family Residence'
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Shajapur, M.P.',
    sub: 'Madhya Pradesh, India'
  },
]

const cornerPath = "M0 0 L100 0 L100 12 L12 12 L12 100 L0 100 Z"

export default function EventDetails() {
  return (
    <section
      id="details"
      className="relative w-full overflow-hidden"
      style={{
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        background: 'linear-gradient(170deg, #420a15 0%, #6B1022 40%, #4a0c18 80%, #3d0813 100%)'
      }}
    >
      {/* Ambient radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 50%, rgba(201,168,76,0.06), transparent)'
        }}
      />

      {/* Top divider line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-label font-subheading text-gold-soft/70 tracking-[0.25em] mb-4">
            ✦ &nbsp; You Are Invited &nbsp; ✦
          </p>
          <h2 className="text-section-title font-heading font-bold text-cream">
            Event Details
          </h2>
          <div className="h-[1px] w-24 mx-auto mt-5 bg-gradient-to-r from-transparent via-gold/60 to-transparent" />
        </motion.div>

        {/* Main glass card */}
        <motion.div
          initial={{ opacity: 0, y: 50, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="relative max-w-4xl mx-auto glass-card-dark rounded-3xl p-8 md:p-14"
        >
          {/* SVG Corner Decorations */}
          {[
            'top-4 left-4 rotate-0',
            'top-4 right-4 rotate-90',
            'bottom-4 right-4 rotate-180',
            'bottom-4 left-4 -rotate-90',
          ].map((cls, i) => (
            <div key={i} className={`absolute w-8 h-8 md:w-10 md:h-10 text-gold/30 pointer-events-none ${cls}`}>
              <svg viewBox="0 0 100 100" fill="currentColor">
                <path d={cornerPath} />
              </svg>
            </div>
          ))}

          {/* Inner subtle border frame */}
          <div className="absolute inset-6 rounded-2xl border border-gold/8 pointer-events-none" />

          {/* Details Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 md:gap-8">
            {DETAILS.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: i * 0.1 }}
                className="flex items-start gap-5 p-5 md:p-6 rounded-2xl
                  hover:bg-white/[0.03] transition-colors duration-300 group"
              >
                {/* Icon */}
                <div className="flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-2xl
                  border border-gold/25 bg-gold/5 flex items-center justify-center
                  group-hover:border-gold/45 group-hover:bg-gold/10 transition-all duration-300"
                >
                  <item.icon className="w-5 h-5 md:w-6 md:h-6 text-gold" />
                </div>

                {/* Text */}
                <div className="space-y-1 min-w-0">
                  <p className="text-label tracking-[0.2em] text-gold-soft/60 font-subheading">
                    {item.label}
                  </p>
                  <p className="font-subheading text-xl md:text-2xl font-semibold text-cream leading-tight">
                    {item.value}
                  </p>
                  <p className="text-sm text-gold-soft/50 font-light">
                    {item.sub}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Bottom accent */}
          <div className="mt-10 pt-8 border-t border-gold/10 text-center">
            <p className="font-subheading text-lg md:text-xl italic text-gold-soft/60 font-light">
              We request the honour of your presence.
            </p>
          </div>
        </motion.div>
      </div>

      {/* Bottom divider */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/30 to-transparent" />
    </section>
  )
}
