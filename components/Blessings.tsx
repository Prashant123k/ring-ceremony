'use client'

import { motion } from 'framer-motion'

export default function Blessings() {
  return (
    <section 
      id="blessings-section"
      className="relative min-h-[50vh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-maroon to-[#420a15] py-24 px-6 overflow-hidden border-b border-gold/10"
    >
      {/* Background Soft Floral SVGs (overlapping leaves and flowers in corners) */}
      <div className="absolute top-0 left-0 w-32 h-32 md:w-56 md:h-56 text-gold/10 pointer-events-none select-none">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M0 0 C30 10 50 40 40 70 C30 90 10 80 0 100 Z" />
          <path d="M0 0 C40 30 70 50 100 0 Z" opacity="0.5" />
        </svg>
      </div>

      <div className="absolute bottom-0 right-0 w-32 h-32 md:w-56 md:h-56 text-gold/10 pointer-events-none select-none rotate-180">
        <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full">
          <path d="M0 0 C30 10 50 40 40 70 C30 90 10 80 0 100 Z" />
          <path d="M0 0 C40 30 70 50 100 0 Z" opacity="0.5" />
        </svg>
      </div>

      {/* Floating Gold Sparkle Accents */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(232,216,168,0.03),transparent_70%)] pointer-events-none" />

      {/* Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="relative z-10 max-w-2xl text-center px-4"
      >
        <motion.div 
          animate={{ y: [0, -6, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="space-y-4"
        >
          <p className="text-xl md:text-3xl font-subheading italic text-gold-soft font-light leading-relaxed">
            "Your presence, love and blessings"
          </p>
          <p className="text-lg md:text-2xl font-subheading uppercase tracking-widest text-[#FFFDF7]/90 font-medium">
            will make this day
          </p>
          <h3 className="text-3xl md:text-5xl font-heading font-extrabold text-gold tracking-widest leading-normal">
            UNFORGETTABLE.
          </h3>
        </motion.div>
      </motion.div>
    </section>
  )
}
