'use client'

import { useRef } from 'react'
import { motion, useScroll, useTransform, Variants } from 'framer-motion'

export default function CoupleStory() {
  const sectionRef = useRef<HTMLDivElement>(null)

  // Scroll logic for rotating the background mandala
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  })

  // Rotate mandala 180 degrees as user scrolls past this section
  const mandalaRotate = useTransform(scrollYProgress, [0, 1], [0, 180])
  const mandalaScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])

  // Text motion variants for progressive reveal
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.4,
        delayChildren: 0.2
      }
    }
  }

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  }

  return (
    <section 
      id="story"
      ref={sectionRef}
      className="relative min-h-[70vh] w-full flex flex-col items-center justify-center bg-luxury overflow-hidden px-6 py-24 border-t border-b border-gold/10"
    >
      {/* Scroll-Linked Subtle Mandala Background */}
      <motion.div 
        style={{ rotate: mandalaRotate, scale: mandalaScale }}
        className="absolute w-[350px] h-[350px] md:w-[600px] md:h-[600px] opacity-[0.03] text-gold pointer-events-none z-0 flex items-center justify-center"
      >
        <svg viewBox="0 0 100 100" fill="none" stroke="currentColor" strokeWidth="0.3" className="w-full h-full">
          <circle cx="50" cy="50" r="46" />
          <circle cx="50" cy="50" r="40" strokeDasharray="1 2" />
          <path d="M50 4 C40 25 35 25 50 48 C65 25 57 25 50 4 Z" />
          <path d="M50 96 C40 75 35 75 50 52 C65 75 57 75 50 96 Z" />
          <path d="M4 50 C25 40 25 35 48 50 C25 65 25 57 4 50 Z" />
          <path d="M96 50 C75 40 75 35 52 50 C75 65 75 57 96 50 Z" />
          <path d="M17 17 L83 83 M17 83 L83 17" />
          <circle cx="50" cy="50" r="15" />
        </svg>
      </motion.div>

      {/* Main Content Area */}
      <motion.div 
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        className="relative z-10 max-w-2xl text-center flex flex-col items-center"
      >
        {/* Title */}
        <motion.h2 
          variants={itemVariants}
          className="text-3xl md:text-5xl font-bold tracking-widest text-maroon mb-12 font-heading"
        >
          A Beautiful Beginning
        </motion.h2>

        {/* Text lines */}
        <div className="space-y-6 md:space-y-8">
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-3xl font-subheading tracking-wider text-dark/80 font-light"
          >
            Two Hearts.
          </motion.p>
          <motion.p 
            variants={itemVariants}
            className="text-xl md:text-3xl font-subheading tracking-wider text-dark/80 font-light"
          >
            One Promise.
          </motion.p>
          <motion.p 
            variants={itemVariants}
            className="text-2xl md:text-4xl font-subheading italic text-gold tracking-widest font-medium"
          >
            A Lifetime Ahead.
          </motion.p>
        </div>

        {/* Gold Accent Line */}
        <motion.div 
          variants={itemVariants}
          className="w-16 h-[1px] bg-gold-soft mt-12"
        />
      </motion.div>
    </section>
  )
}
