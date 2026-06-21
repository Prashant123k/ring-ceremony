'use client'

import { Heart } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="relative w-full bg-[#30050d] text-[#FFFDF7] py-12 px-6 overflow-hidden select-none">
      {/* Top Gold Divider Line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent" />

      <div className="max-w-4xl mx-auto flex flex-col items-center justify-center text-center space-y-4">
        {/* Decorative SVG Motif */}
        <div className="w-16 h-6 text-gold/30">
          <svg viewBox="0 0 100 20" fill="currentColor" className="w-full h-full">
            <circle cx="50" cy="10" r="3" />
            <path d="M50 10 L10 10 M50 10 L90 10" stroke="currentColor" strokeWidth="0.5" />
          </svg>
        </div>

        {/* Couple Title */}
        <h2 className="text-xl md:text-2xl font-heading font-bold tracking-widest text-[#FFFDF7]">
          PRASHANT <span className="text-gold mx-1">♥</span> MITALI
        </h2>

        {/* Event Meta */}
        <div className="flex flex-col sm:flex-row items-center justify-center sm:space-x-4 text-xs md:text-sm tracking-widest uppercase font-light text-gold-soft/80 font-subheading">
          <span>Ring Ceremony</span>
          <span className="hidden sm:inline w-1 h-1 bg-gold rounded-full" />
          <span>19 July 2026</span>
          <span className="hidden sm:inline w-1 h-1 bg-gold rounded-full" />
          <span>Shajapur, MP</span>
        </div>

        {/* Made with love */}
        <p className="flex items-center justify-center space-x-1.5 text-xs text-gold-soft/50 font-light mt-4 pt-4 border-t border-gold/5 w-full max-w-xs">
          <span>Made with</span>
          <Heart className="w-3 h-3 text-gold fill-gold/20" />
          <span>for our special day.</span>
        </p>
      </div>
    </footer>
  )
}
