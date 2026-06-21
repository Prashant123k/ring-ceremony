'use client'

import { motion } from 'framer-motion'

export default function Blessings() {
  return (
    <section
      id="wishes"
      className="relative w-full overflow-hidden"
      style={{
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        background: 'linear-gradient(160deg, #4a0c18 0%, #6B1022 50%, #3d0813 100%)'
      }}
    >
      {/* Top divider */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      {/* Decorative corner florals */}
      {[
        'top-0 left-0',
        'top-0 right-0 scale-x-[-1]',
        'bottom-0 left-0 scale-y-[-1]',
        'bottom-0 right-0 scale-[-1]',
      ].map((cls, i) => (
        <div key={i} className={`absolute w-32 h-32 md:w-48 md:h-48 pointer-events-none select-none opacity-[0.07] text-gold ${cls}`}>
          <svg viewBox="0 0 120 120" fill="currentColor" className="w-full h-full">
            <path d="M0 0 C30 5 65 35 55 80 C45 100 10 95 0 120 Z" />
            <path d="M0 0 C50 20 90 55 120 0 Z" opacity="0.5" />
            <circle cx="40" cy="60" r="8" opacity="0.4" />
          </svg>
        </div>
      ))}

      {/* Radial ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 70% 60% at 50% 40%, rgba(201,168,76,0.06), transparent)'
        }}
      />

      <div className="container-content relative z-10 text-center max-w-3xl mx-auto">
        {/* Icon */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          className="flex justify-center mb-10"
        >
          <div
            className="w-16 h-16 rounded-full border border-gold/30 flex items-center justify-center"
            style={{
              background: 'rgba(201,168,76,0.07)',
              boxShadow: '0 0 30px rgba(201,168,76,0.12)'
            }}
          >
            <span className="text-2xl animate-heartbeat text-gold">♥</span>
          </div>
        </motion.div>

        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-label font-subheading text-gold-soft/60 tracking-[0.25em] mb-6"
        >
          ✦ &nbsp; A Heartfelt Request &nbsp; ✦
        </motion.p>

        {/* Main message */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="space-y-6"
        >
          <p
            className="font-subheading font-light italic text-gold-soft/80 leading-relaxed"
            style={{ fontSize: 'clamp(1.25rem, 3.5vw, 1.75rem)' }}
          >
            &ldquo;Your presence, love, and blessings&rdquo;
          </p>

          <p
            className="font-subheading uppercase tracking-[0.18em] text-cream/80 font-medium"
            style={{ fontSize: 'clamp(0.95rem, 2.5vw, 1.2rem)' }}
          >
            will make this day
          </p>

          <motion.h2
            animate={{ opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            className="font-heading font-black text-gold tracking-widest"
            style={{
              fontSize: 'clamp(2rem, 6vw, 3.5rem)',
              textShadow: '0 0 40px rgba(201,168,76,0.25)'
            }}
          >
            UNFORGETTABLE.
          </motion.h2>
        </motion.div>

        {/* Bottom ornament */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          whileInView={{ opacity: 1, scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="flex items-center justify-center gap-4 mt-14 origin-center"
        >
          <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gold/30" />
          <svg viewBox="0 0 60 24" className="w-14 h-5 text-gold" fill="currentColor">
            <path d="M30 0 C24 8 16 10 6 10 C16 10 22 14 30 24 C38 14 44 10 54 10 C44 10 36 8 30 0 Z" opacity="0.4" />
            <circle cx="30" cy="12" r="2" />
            <circle cx="12" cy="12" r="1.2" opacity="0.5" />
            <circle cx="48" cy="12" r="1.2" opacity="0.5" />
          </svg>
          <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gold/30" />
        </motion.div>
      </div>

      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-gold/25 to-transparent" />
    </section>
  )
}
