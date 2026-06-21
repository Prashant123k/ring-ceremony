'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation2 } from 'lucide-react'

export default function Location() {
  const mapsUrl = 'https://www.google.com/maps/search/?api=1&query=Shajapur+Madhya+Pradesh+India'

  return (
    <section
      id="location"
      className="relative w-full overflow-hidden section-sep"
      style={{
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        background: 'linear-gradient(180deg, #faf6ea 0%, var(--background) 100%)'
      }}
    >
      {/* Background diamond watermark */}
      <div
        className="absolute inset-0 flex items-center justify-center pointer-events-none select-none opacity-[0.025]"
        aria-hidden
      >
        <svg viewBox="0 0 200 200" className="w-[500px] h-[500px] text-maroon" fill="none" stroke="currentColor" strokeWidth="0.4">
          <path d="M100 5 L195 100 L100 195 L5 100 Z" />
          <path d="M100 25 L175 100 L100 175 L25 100 Z" />
          <circle cx="100" cy="100" r="40" />
          <circle cx="100" cy="100" r="20" />
        </svg>
      </div>

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-label font-subheading text-gold tracking-[0.25em] mb-4">
            ✦ &nbsp; Find Us &nbsp; ✦
          </p>
          <h2 className="text-section-title font-heading font-bold text-maroon">
            Venue Location
          </h2>
          <div className="gold-line w-24 mx-auto mt-5" />
        </motion.div>

        {/* Main card */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-xl mx-auto"
        >
          <div
            className="relative rounded-3xl overflow-hidden border border-gold/15"
            style={{ background: '#FFFFFF' }}
          >
            {/* Top gold band */}
            <div
              className="h-2 w-full"
              style={{ background: 'linear-gradient(to right, var(--primary-maroon), var(--primary-gold), var(--primary-maroon))' }}
            />

            {/* Card body */}
            <div className="p-8 md:p-12 text-center">
              {/* Floating pin icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                className="w-16 h-16 rounded-full bg-maroon/5 border border-maroon/12
                  flex items-center justify-center mx-auto mb-8 shadow-sm"
              >
                <MapPin className="w-8 h-8 text-maroon" />
              </motion.div>

              {/* Venue name */}
              <h3 className="font-heading font-bold text-maroon text-2xl md:text-3xl tracking-widest mb-3">
                HOME FUNCTION
              </h3>

              <div className="gold-line w-16 mx-auto mb-6" />

              {/* Address */}
              <div className="space-y-1 mb-8">
                <p className="font-subheading text-xl md:text-2xl font-semibold text-dark/80">
                  Shajapur
                </p>
                <p className="font-subheading text-lg text-dark/55 font-light">
                  Madhya Pradesh, India
                </p>
              </div>

              {/* Details chips */}
              <div className="flex flex-wrap items-center justify-center gap-3 mb-10">
                {['19 July 2026', 'Sunday', '5:00 PM'].map(chip => (
                  <span
                    key={chip}
                    className="px-4 py-1.5 rounded-full bg-gold/8 border border-gold/20
                      font-subheading text-sm text-maroon/70 tracking-wider"
                  >
                    {chip}
                  </span>
                ))}
              </div>

              {/* Note */}
              <p className="text-sm text-dark/40 font-light italic mb-10 leading-relaxed">
                Please join us at our family residence for the celebration.<br />
                All are most welcome.
              </p>

              {/* CTA Button */}
              <motion.a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.04, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="btn-primary inline-flex items-center gap-3 shadow-lg
                  shadow-maroon/20 hover:shadow-maroon/30 transition-shadow duration-300"
              >
                <Navigation2 className="w-4 h-4 text-gold" />
                <span>Get Directions</span>
              </motion.a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
