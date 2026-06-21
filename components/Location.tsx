'use client'

import { motion } from 'framer-motion'
import { MapPin, Navigation } from 'lucide-react'

export default function Location() {
  const destinationUrl = 'https://www.google.com/maps/search/?api=1&query=Shajapur+Madhya+Pradesh+India'

  return (
    <section 
      id="location"
      className="relative min-h-[60vh] w-full flex flex-col items-center justify-center bg-luxury py-24 px-6 overflow-hidden border-b border-gold/10"
    >
      {/* Decorative vectors in the background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.015] pointer-events-none select-none">
        <svg viewBox="0 0 100 100" className="w-[600px] h-[600px] text-maroon fill-current">
          <circle cx="50" cy="50" r="48" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M50 0 L100 50 L50 100 L0 50 Z" />
        </svg>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 max-w-xl w-full text-center flex flex-col items-center"
      >
        {/* MapPin Icon Circle */}
        <div className="w-16 h-16 rounded-full border-2 border-gold text-maroon flex items-center justify-center bg-white shadow-md mb-8 animate-float">
          <MapPin className="w-8 h-8 text-maroon fill-maroon/10" />
        </div>

        {/* Header */}
        <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-maroon font-heading mb-6">
          Venue Location
        </h2>

        {/* Location Details Card */}
        <div className="w-full bg-white border border-gold/20 rounded-2xl p-8 md:p-10 shadow-sm relative mb-10">
          {/* Subtle gold design outline frame inside the card */}
          <div className="absolute inset-3 border border-gold/10 rounded-xl pointer-events-none" />

          <h3 className="text-2xl font-subheading text-maroon font-semibold mb-3">
            Home Function
          </h3>
          <p className="text-lg text-dark/85 font-light leading-relaxed max-w-sm mx-auto">
            Shajapur, Madhya Pradesh, India
          </p>
          
          <div className="w-12 h-[1px] bg-gold mx-auto my-6" />

          <p className="text-sm text-dark/60 font-light italic">
            Please join us at our family residence for the celebration ceremonies.
          </p>
        </div>

        {/* Premium Action Button */}
        <motion.a
          href={destinationUrl}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.03, boxShadow: '0 10px 20px rgba(107, 16, 34, 0.15)' }}
          whileTap={{ scale: 0.98 }}
          className="flex items-center space-x-3 px-8 py-4 bg-maroon text-white font-subheading uppercase tracking-widest rounded-full border border-gold shadow-md hover:bg-[#540d1c] transition-colors duration-300 cursor-pointer"
        >
          <Navigation className="w-5 h-5 text-gold fill-gold/10" />
          <span>Get Directions</span>
        </motion.a>
      </motion.div>
    </section>
  )
}
