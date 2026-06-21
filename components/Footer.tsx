'use client'

import { Fragment } from 'react'
import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer
      className="relative w-full overflow-hidden text-cream"
      style={{
        background: 'linear-gradient(180deg, #1e030a 0%, #0f0206 100%)',
        padding: 'clamp(40px, 8vh, 72px) var(--section-padding-x)'
      }}
    >
      {/* Top gold line */}
      <div
        className="absolute top-0 inset-x-0 h-[1px]"
        style={{
          background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.6), transparent)'
        }}
      />

      {/* Subtle ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 0%, rgba(201,168,76,0.04), transparent)'
        }}
      />

      <div className="container-content relative z-10 flex flex-col items-center text-center gap-6">
        {/* Decorative motif */}
        <svg viewBox="0 0 80 20" className="w-20 h-5 text-gold/30" fill="currentColor">
          <circle cx="40" cy="10" r="2.5" />
          <path d="M40 10 L8 10" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <path d="M40 10 L72 10" stroke="currentColor" strokeWidth="0.5" fill="none" />
          <circle cx="8" cy="10" r="1" />
          <circle cx="72" cy="10" r="1" />
        </svg>

        {/* Names */}
        <h2 className="font-heading font-bold text-xl md:text-2xl tracking-[0.2em]">
          PRASHANT <span className="text-gold mx-2">♥</span> MITALI
        </h2>

        {/* Event info */}
        <div className="flex flex-wrap items-center justify-center gap-3 md:gap-5">
          {[
            'Ring Ceremony',
            '19 July 2026',
            'Shajapur, M.P.'
          ].map((item, i, arr) => (
            <Fragment key={item}>
              <span className="font-subheading text-sm tracking-[0.18em] uppercase text-gold-soft/50 font-light">
                {item}
              </span>
              {i < arr.length - 1 && (
                <span className="w-1 h-1 rounded-full bg-gold/20" />
              )}
            </Fragment>
          ))}
        </div>

        {/* Divider */}
        <div
          className="w-32 h-[1px]"
          style={{ background: 'linear-gradient(to right, transparent, rgba(201,168,76,0.2), transparent)' }}
        />

        {/* Made with love */}
        <p className="flex items-center gap-2 text-xs text-gold-soft/25 font-light font-subheading tracking-widest">
          <span>Crafted with</span>
          <Heart className="w-3 h-3 text-gold/30 fill-gold/10" />
          <span>for our special day</span>
        </p>
      </div>
    </footer>
  )
}
