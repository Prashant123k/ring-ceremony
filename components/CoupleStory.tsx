'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'

const STORY_LINES = [
  { text: 'Two Hearts.', className: 'text-maroon/70', italic: false },
  { text: 'One Promise.', className: 'text-maroon/80', italic: false },
  { text: 'A Lifetime Ahead.', className: 'text-gold', italic: true },
]

export default function CoupleStory() {
  const sectionRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start']
  })

  const mandalaRotate = useTransform(scrollYProgress, [0, 1], [0, 200])
  const leftImageX = useTransform(scrollYProgress, [0, 0.6], ['-5%', '0%'])
  const leftImageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])
  const rightImageX = useTransform(scrollYProgress, [0, 0.6], ['5%', '0%'])
  const rightImageOpacity = useTransform(scrollYProgress, [0, 0.3], [0, 1])

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.35, delayChildren: 0.2 }
    }
  }

  const lineVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1, y: 0,
      transition: { duration: 1, ease: [0.16, 1, 0.3, 1] }
    }
  }

  return (
    <section
      id="story"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-cream section-sep"
      style={{
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        background: 'linear-gradient(180deg, var(--background) 0%, #faf6ea 100%)'
      }}
    >
      {/* Rotating mandala watermark */}
      <motion.div
        style={{ rotate: mandalaRotate }}
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none opacity-[0.03] text-maroon"
      >
        <svg viewBox="0 0 200 200" className="w-[600px] h-[600px]" fill="none" stroke="currentColor" strokeWidth="0.3">
          <circle cx="100" cy="100" r="95" />
          <circle cx="100" cy="100" r="78" strokeDasharray="1 4" />
          <path d="M100 5 C88 40 70 40 100 88 C130 40 112 40 100 5 Z
                   M100 195 C88 160 70 160 100 112 C130 160 112 160 100 195 Z
                   M5 100 C40 88 40 70 88 100 C40 130 40 112 5 100 Z
                   M195 100 C160 88 160 70 112 100 C160 130 160 112 195 100 Z" />
          <circle cx="100" cy="100" r="40" />
          <path d="M100 65 C94 78 88 92 100 100 C112 92 106 78 100 65 Z
                   M100 135 C94 122 88 108 100 100 C112 108 106 122 100 135 Z" />
          <path d="M40 45 C60 62 65 80 95 95 C62 65 60 62 40 45 Z
                   M160 155 C140 138 135 120 105 105 C138 135 140 138 160 155 Z
                   M40 155 C60 138 65 120 95 105 C62 135 60 138 40 155 Z
                   M160 45 C140 62 135 80 105 95 C138 65 140 62 160 45 Z" />
        </svg>
      </motion.div>

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.9 }}
          className="text-center mb-16 md:mb-24"
        >
          <p className="text-label font-subheading text-gold tracking-[0.25em] mb-4">
            ✦ &nbsp; Our Story &nbsp; ✦
          </p>
          <h2 className="text-section-title font-heading font-bold text-maroon">
            A Beautiful Beginning
          </h2>
          <div className="gold-line w-24 mx-auto mt-5" />
        </motion.div>

        {/* Central poem layout */}
        <div className="max-w-3xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            className="text-center space-y-8 md:space-y-10"
          >
            {STORY_LINES.map((line, i) => (
              <motion.div
                key={i}
                variants={lineVariants}
                className="relative"
              >
                <p
                  className={`text-quote md:text-4xl font-subheading font-light leading-relaxed tracking-wider ${line.className} ${line.italic ? 'italic' : ''}`}
                  style={{ fontSize: i === 2 ? 'clamp(1.5rem, 5vw, 2.75rem)' : 'clamp(1.25rem, 4vw, 2.25rem)' }}
                >
                  {i === 2 && (
                    <span className="inline-block w-8 h-[1px] bg-gold/40 vertical-align mr-4 align-middle" />
                  )}
                  {line.text}
                  {i === 2 && (
                    <span className="inline-block w-8 h-[1px] bg-gold/40 vertical-align ml-4 align-middle" />
                  )}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Decorative separator */}
          <motion.div
            initial={{ opacity: 0, scaleX: 0 }}
            whileInView={{ opacity: 1, scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.8 }}
            className="flex items-center justify-center gap-6 mt-16 origin-center"
          >
            <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-gold/40" />
            <svg viewBox="0 0 40 20" className="w-10 h-5 text-gold" fill="currentColor">
              <path d="M20 0 C16 6 10 8 2 8 C10 8 15 12 20 20 C25 12 30 8 38 8 C30 8 24 6 20 0 Z" opacity="0.5" />
              <circle cx="20" cy="10" r="1.5" />
            </svg>
            <div className="h-[1px] flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-gold/40" />
          </motion.div>

          {/* Bottom invitation */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.4 }}
            className="text-center mt-10 font-subheading text-lg md:text-xl text-maroon/60 font-light italic tracking-wide"
          >
            19 July 2026 &nbsp;·&nbsp; Shajapur, Madhya Pradesh
          </motion.p>
        </div>
      </div>
    </section>
  )
}
