'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, Variants } from 'framer-motion'

interface IntroLoaderProps {
  onComplete: () => void
}

export default function IntroLoader({ onComplete }: IntroLoaderProps) {
  const [showText, setShowText] = useState(false)
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    // Stage 1: Wait for mandala to draw, then show names
    const textTimer = setTimeout(() => {
      setShowText(true)
    }, 1000)

    // Stage 2: Automatically complete loading after 3.2s
    const completeTimer = setTimeout(() => {
      handleComplete()
    }, 4000)

    return () => {
      clearTimeout(textTimer)
      clearTimeout(completeTimer)
    }
  }, [])

  const handleComplete = () => {
    setIsVisible(false)
    setTimeout(() => {
      onComplete()
    }, 100) // Wait for exit animation to finish
  }

  // Mandala drawing animation settings
  const mandalaPathVariants: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: {
      pathLength: 1,
      opacity: 0.8,
      transition: {
        duration: 1.5,
        ease: "easeInOut",
      }
    }
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ y: 0 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1] }
          }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gradient-to-b from-[#3d0813] to-maroon text-[#FFFDF7]"
        >
          {/* Skip Button */}
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.7 }}
            whileHover={{ opacity: 1, scale: 1.05 }}
            onClick={handleComplete}
            className="absolute top-6 right-6 px-4 py-2 border border-gold-soft/30 rounded-full font-subheading text-sm text-gold-soft tracking-wider cursor-pointer z-50 backdrop-blur-sm"
          >
            SKIP
          </motion.button>

          {/* Luxury Mandala SVG Container */}
          <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
            {/* Soft gold rotating background glow */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 rounded-full opacity-10 bg-radial from-gold-soft via-transparent to-transparent blur-xl"
            />

            <svg
              viewBox="0 0 100 100"
              className="w-full h-full text-gold stroke-current fill-none stroke-[0.4]"
            >
              {/* Outer Ring */}
              <motion.circle
                cx="50" cy="50" r="48"
                variants={mandalaPathVariants}
                initial="hidden"
                animate="visible"
              />

              {/* Outer Decorative Dots */}
              <motion.circle
                cx="50" cy="50" r="44"
                strokeDasharray="1 3"
                variants={mandalaPathVariants}
                initial="hidden"
                animate="visible"
              />

              {/* Symmetric Petals */}
              <motion.path
                d="M50 6 C43 25 35 25 50 45 C65 25 57 25 50 6 Z
                   M50 94 C43 75 35 75 50 55 C65 75 57 75 50 94 Z
                   M6 50 C25 43 25 35 45 50 C25 65 25 57 6 50 Z
                   M94 50 C75 43 75 35 55 50 C75 65 75 57 94 50 Z"
                variants={mandalaPathVariants}
                initial="hidden"
                animate="visible"
              />

              {/* Diagonal Petals */}
              <motion.path
                d="M19 19 C33 30 30 37 46 46 C30 33 37 30 19 19 Z
                   M81 81 C67 70 70 63 54 54 C70 67 63 70 81 81 Z
                   M19 81 C33 70 30 63 46 54 C30 67 37 70 19 81 Z
                   M81 19 C67 30 70 37 54 46 C70 33 63 30 81 19 Z"
                variants={mandalaPathVariants}
                initial="hidden"
                animate="visible"
              />

              {/* Middle Circle */}
              <motion.circle
                cx="50" cy="50" r="22"
                variants={mandalaPathVariants}
                initial="hidden"
                animate="visible"
              />

              {/* Inner Flower */}
              <motion.path
                d="M50 35 C47 43 43 47 50 50 C57 47 53 43 50 35 Z
                   M50 65 C47 57 43 53 50 50 C57 53 53 57 50 65 Z
                   M35 50 C43 47 47 43 50 50 C47 57 43 53 35 50 Z
                   M65 50 C57 47 53 43 50 50 C57 57 53 53 65 50 Z"
                variants={mandalaPathVariants}
                initial="hidden"
                animate="visible"
              />

              {/* Center Core dot */}
              <motion.circle
                cx="50" cy="50" r="3"
                className="fill-gold"
                variants={mandalaPathVariants}
                initial="hidden"
                animate="visible"
              />
            </svg>
          </div>

          {/* Couple Typography Reveal */}
          <div className="h-32 mt-8 flex flex-col items-center justify-center text-center">
            <AnimatePresence>
              {showText && (
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={{
                    visible: { transition: { staggerChildren: 0.25 } }
                  }}
                  className="flex flex-col items-center"
                >
                  {/* Couple Names */}
                  <motion.h1
                    variants={{
                      hidden: { opacity: 0, y: 15 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-3xl md:text-5xl font-bold tracking-widest gold-shimmer-text"
                  >
                    PRASHANT & MITALI
                  </motion.h1>

                  {/* Divider Motif */}
                  <motion.div
                    variants={{
                      hidden: { scaleX: 0, opacity: 0 },
                      visible: { scaleX: 1, opacity: 0.8 }
                    }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                    className="w-24 h-[1px] bg-gold my-3 origin-center"
                  />

                  {/* Event Type */}
                  <motion.p
                    variants={{
                      hidden: { opacity: 0, y: 10 },
                      visible: { opacity: 0.9, y: 0 }
                    }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="text-sm md:text-base font-subheading uppercase tracking-widest text-gold-soft"
                  >
                    Ring Ceremony
                  </motion.p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
