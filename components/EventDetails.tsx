'use client'

import { motion } from 'framer-motion'
import { Calendar, Clock, Home, MapPin } from 'lucide-react'

export default function EventDetails() {
  const details = [
    {
      icon: <Calendar className="w-6 h-6 text-gold" />,
      label: 'Date',
      value: '19 July 2026',
      sub: 'Sunday'
    },
    {
      icon: <Clock className="w-6 h-6 text-gold" />,
      label: 'Time',
      value: '5:00 PM onwards',
      sub: 'Indian Standard Time'
    },
    {
      icon: <Home className="w-6 h-6 text-gold" />,
      label: 'Venue',
      value: 'Home Function',
      sub: 'Celebration Residence'
    },
    {
      icon: <MapPin className="w-6 h-6 text-gold" />,
      label: 'Location',
      value: 'Shajapur, Madhya Pradesh',
      sub: 'India'
    }
  ]

  return (
    <section 
      id="details"
      className="relative min-h-[80vh] w-full flex flex-col items-center justify-center bg-gradient-to-b from-maroon via-[#540d1c] to-[#3d0813] py-24 px-6 overflow-hidden"
    >
      {/* Background Subtle Sparkles */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(214,175,55,0.06),transparent_80%)] pointer-events-none" />

      {/* Heading */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.8 }}
        className="text-center mb-16 relative z-10"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-[#FFFDF7] font-heading mb-4">
          Event Details
        </h2>
        <div className="w-16 h-[1px] bg-gold mx-auto" />
      </motion.div>

      {/* Main Luxury Glass Card */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 w-full max-w-4xl glass-card-dark rounded-2xl p-8 md:p-12"
      >
        {/* Decorative corner motifs in SVG */}
        <div className="absolute top-4 left-4 text-gold/25 w-8 h-8 pointer-events-none">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
          </svg>
        </div>
        <div className="absolute top-4 right-4 text-gold/25 w-8 h-8 pointer-events-none rotate-90">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
          </svg>
        </div>
        <div className="absolute bottom-4 left-4 text-gold/25 w-8 h-8 pointer-events-none -rotate-90">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
          </svg>
        </div>
        <div className="absolute bottom-4 right-4 text-gold/25 w-8 h-8 pointer-events-none rotate-180">
          <svg viewBox="0 0 100 100" fill="currentColor">
            <path d="M0 0 L100 0 L100 10 L10 10 L10 100 L0 100 Z" />
          </svg>
        </div>

        {/* Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 relative z-10">
          {details.map((item, idx) => (
            <motion.div 
              key={idx}
              initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1 }}
              className="flex items-start space-x-5 p-4 rounded-lg hover:bg-gold/5 transition-colors duration-300"
            >
              {/* Gold Circle Wrapper for Icons */}
              <div className="flex-shrink-0 w-12 h-12 rounded-full border border-gold/40 flex items-center justify-center bg-maroon/40 shadow-inner">
                {item.icon}
              </div>

              {/* Text Fields */}
              <div className="space-y-1">
                <span className="text-xs uppercase tracking-widest text-gold-soft font-subheading font-medium">
                  {item.label}
                </span>
                <h3 className="text-xl md:text-2xl font-subheading text-[#FFFDF7] font-semibold">
                  {item.value}
                </h3>
                <p className="text-sm text-gold-soft/75 font-light">
                  {item.sub}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Subtle glowing bottom boundary */}
      <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
    </section>
  )
}
