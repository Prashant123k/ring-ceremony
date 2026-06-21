'use client'

import { motion } from 'framer-motion'

export default function FamilyBlessings() {
  return (
    <section 
      id="blessings"
      className="relative min-h-[50vh] w-full flex items-center justify-center bg-luxury px-6 py-20 overflow-hidden"
    >
      {/* Background Decorative Mandala Accent */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none flex items-center justify-center">
        <svg viewBox="0 0 100 100" className="w-[500px] h-[500px] text-maroon fill-current">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M50 2 C40 20 20 40 50 50 C80 40 60 20 50 2 Z M50 98 C40 80 20 60 50 50 C80 60 60 80 50 98 Z" />
        </svg>
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-3xl text-center flex flex-col items-center justify-center"
      >
        {/* Top Elegant Floral Ornament */}
        <div className="w-24 h-8 text-gold mb-6 opacity-80">
          <svg viewBox="0 0 100 30" fill="currentColor" className="w-full h-full">
            <path d="M50 0 C40 10 30 15 10 15 C30 15 40 20 50 30 C60 20 70 15 90 15 C70 15 60 10 50 0 Z" />
            <circle cx="50" cy="15" r="2.5" className="fill-maroon" />
            <circle cx="25" cy="15" r="1.5" />
            <circle cx="75" cy="15" r="1.5" />
          </svg>
        </div>

        {/* Invitation Text */}
        <h2 className="text-sm md:text-base font-subheading uppercase tracking-[0.25em] text-maroon mb-6 font-medium">
          With Blessings
        </h2>

        <p className="text-2xl md:text-4xl font-subheading font-light text-maroon leading-relaxed italic max-w-2xl px-2">
          "With the blessings of our families, we invite you to join us in celebrating the beginning of our forever."
        </p>

        {/* Bottom Ornament */}
        <div className="w-24 h-8 text-gold mt-6 opacity-80 rotate-180">
          <svg viewBox="0 0 100 30" fill="currentColor" className="w-full h-full">
            <path d="M50 0 C40 10 30 15 10 15 C30 15 40 20 50 30 C60 20 70 15 90 15 C70 15 60 10 50 0 Z" />
            <circle cx="50" cy="15" r="2.5" className="fill-maroon" />
            <circle cx="25" cy="15" r="1.5" />
            <circle cx="75" cy="15" r="1.5" />
          </svg>
        </div>
      </motion.div>
    </section>
  )
}
