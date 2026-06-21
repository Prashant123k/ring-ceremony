'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function GrandFinale() {
  const containerRef = useRef<HTMLDivElement>(null)

  // Parallax scroll controls
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  // background scales up slightly, overlays shift
  const bgScale = useTransform(scrollYProgress, [0, 1], [1.05, 1.2])
  const textY = useTransform(scrollYProgress, [0, 1], ["0px", "-40px"])

  return (
    <section 
      id="finale"
      ref={containerRef}
      className="relative h-[85vh] w-full overflow-hidden flex items-center justify-center bg-maroon"
    >
      {/* Background Parallax Image */}
      <motion.div 
        style={{ scale: bgScale }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/couple-4.png"
          alt="The Beginning of Forever"
          fill
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon via-maroon/40 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Main Overlay Content */}
      <motion.div 
        style={{ y: textY }}
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-10 text-center px-4 max-w-2xl flex flex-col items-center select-none"
      >
        <span className="text-xs md:text-sm font-subheading uppercase tracking-[0.3em] text-gold-soft mb-2">
          Save the Date
        </span>

        <h2 className="text-3xl md:text-6xl font-heading font-black tracking-widest text-[#FFFDF7] leading-tight">
          THE BEGINNING OF FOREVER
        </h2>

        {/* Floating Heart */}
        <div className="text-gold text-2xl my-4 animate-pulse">♥</div>

        <h3 className="text-2xl md:text-4xl font-heading font-bold text-gold-soft tracking-wider">
          PRASHANT & MITALI
        </h3>

        {/* Animated Gold Divider Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeInOut" }}
          className="w-32 h-[1px] bg-gold my-6 origin-center"
        />

        <p className="text-sm md:text-base font-subheading text-[#FFFDF7]/90 tracking-widest uppercase italic">
          Thank you for being part of our journey.
        </p>
      </motion.div>

      {/* Elegant Outer Border overlay */}
      <div className="absolute inset-4 md:inset-8 border border-gold/15 pointer-events-none z-20 rounded-sm" />
    </section>
  )
}
