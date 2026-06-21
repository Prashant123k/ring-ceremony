'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function GrandFinale() {
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  })

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.08, 1.22])
  const textY = useTransform(scrollYProgress, [0, 1], ['20px', '-40px'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0.6])

  return (
    <section
      id="finale"
      ref={containerRef}
      className="relative overflow-hidden flex items-center justify-center"
      style={{ height: 'min(90vh, 700px)' }}
    >
      {/* Parallax Background */}
      <motion.div
        style={{ scale: bgScale }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/couple-4.png"
          alt="Prashant & Mitali — The Beginning of Forever"
          fill sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Layered cinematic overlays */}
      <div className="absolute inset-0 z-[1]">
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2a0508]/95 via-[#3d0813]/40 to-transparent" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse at center, transparent 30%, rgba(0,0,0,0.6) 100%)'
          }}
        />
      </div>

      {/* Corner frames */}
      <div className="absolute inset-5 md:inset-10 z-[2] pointer-events-none">
        {(['tl', 'tr', 'bl', 'br'] as const).map(pos => (
          <div
            key={pos}
            className={`absolute w-10 h-10 md:w-16 md:h-16 border-gold/30
              ${pos === 'tl' ? 'top-0 left-0 border-t border-l' : ''}
              ${pos === 'tr' ? 'top-0 right-0 border-t border-r' : ''}
              ${pos === 'bl' ? 'bottom-0 left-0 border-b border-l' : ''}
              ${pos === 'br' ? 'bottom-0 right-0 border-b border-r' : ''}
            `}
          />
        ))}
      </div>

      {/* Content */}
      <motion.div
        style={{ y: textY, opacity: textOpacity }}
        className="relative z-[3] text-center px-6 max-w-3xl flex flex-col items-center select-none"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-label font-subheading text-gold-soft/70 tracking-[0.3em] mb-8"
        >
          ✦ &nbsp; Save the Date &nbsp; ✦
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="font-heading font-black text-cream tracking-widest leading-tight mb-6"
          style={{
            fontSize: 'clamp(2rem, 6vw, 4rem)',
            textShadow: '0 4px 40px rgba(0,0,0,0.6)'
          }}
        >
          THE BEGINNING<br />OF FOREVER
        </motion.h2>

        {/* Heart */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1], delay: 0.2 }}
          className="mb-6"
        >
          <span className="text-gold text-3xl md:text-4xl animate-heartbeat block">♥</span>
        </motion.div>

        <motion.h3
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.25 }}
          className="font-heading font-bold text-gold-soft tracking-[0.15em]"
          style={{ fontSize: 'clamp(1.5rem, 4vw, 2.5rem)' }}
        >
          PRASHANT & MITALI
        </motion.h3>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="w-40 h-[1px] bg-gradient-to-r from-transparent via-gold/70 to-transparent my-8 origin-center"
        />

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="font-subheading italic text-cream/70 text-lg md:text-xl tracking-wider font-light"
        >
          Thank you for being part of our journey.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9, delay: 0.65 }}
          className="font-subheading text-gold-soft/50 text-label tracking-[0.22em] mt-4"
        >
          19 JULY 2026 &nbsp;·&nbsp; SHAJAPUR, M.P.
        </motion.p>
      </motion.div>
    </section>
  )
}
