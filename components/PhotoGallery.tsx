'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform, PanInfo } from 'framer-motion'
import Image from 'next/image'

interface Card {
  id: number
  src: string
  name: string
  subtitle: string
}

const CARDS: Card[] = [
  { id: 1, src: '/images/prashant-th.jpeg', name: 'Prashant', subtitle: 'The Groom' },
  { id: 2, src: '/images/mitali-ai.jpeg', name: 'Mitali', subtitle: 'The Bride' },
  { id: 3, src: '/images/prashant-th.jpeg', name: 'Prashant', subtitle: 'The Groom' },
  { id: 4, src: '/images/mitali-ai.jpeg', name: 'Mitali', subtitle: 'The Bride' },
]

export default function PhotoGallery() {
  const [cards, setCards] = useState<Card[]>(CARDS)
  const [direction, setDirection] = useState<'left' | 'right' | null>(null)

  const dragX = useMotionValue(0)
  const cardRotate = useTransform(dragX, [-180, 180], [-18, 18])
  const cardOpacity = useTransform(dragX, [-200, -100, 0, 100, 200], [0.6, 1, 1, 1, 0.6])
  const nextCardScale = useTransform(dragX, [-150, 0, 150], [1, 0.94, 1])

  const cycle = (dir?: 'left' | 'right') => {
    setDirection(dir || 'right')
    setTimeout(() => {
      setCards(prev => {
        const copy = [...prev]
        const first = copy.shift()
        if (first) copy.push(first)
        return copy
      })
      setDirection(null)
    }, 300)
  }

  const handleDragEnd = (_: unknown, info: PanInfo) => {
    if (Math.abs(info.offset.x) > 80) {
      cycle(info.offset.x > 0 ? 'right' : 'left')
    }
  }

  return (
    <section
      id="gallery"
      className="relative w-full overflow-hidden section-sep"
      style={{
        padding: 'var(--section-padding-y) var(--section-padding-x)',
        background: 'linear-gradient(160deg, #faf6ea 0%, var(--background) 100%)'
      }}
    >
      {/* Ambient gold orb */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 60%, rgba(201,168,76,0.04), transparent)'
        }}
      />

      <div className="container-content relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.9 }}
          className="text-center mb-14 md:mb-20"
        >
          <p className="text-label font-subheading text-gold tracking-[0.25em] mb-4">
            ✦ &nbsp; Photo Gallery &nbsp; ✦
          </p>
          <h2 className="text-section-title font-heading font-bold text-maroon">
            Moments of Love
          </h2>
          <div className="gold-line w-24 mx-auto mt-5" />
          <p className="text-sm md:text-base font-subheading text-maroon/50 tracking-wider mt-4 italic">
            Tap the photo or swipe to explore
          </p>
        </motion.div>

        {/* Card Stack Layout */}
        <div className="flex flex-col items-center">
          {/* 3D Stack */}
          <div
            className="relative cursor-grab active:cursor-grabbing"
            style={{ width: 'min(320px, 85vw)', height: 'min(430px, 110vw)' }}
          >
            <AnimatePresence mode="popLayout">
              {cards.slice(0, 4).map((card, index) => {
                const isTop = index === 0
                const zIndex = 30 - index * 5

                // Layering offsets
                const yOffset = index * 14
                const scaleDown = 1 - index * 0.055
                const rotateResting = [0, 3, -4, 5][index] ?? 0

                return (
                  <motion.div
                    key={card.id}
                    style={{
                      zIndex,
                      x: isTop ? dragX : 0,
                      rotate: isTop ? cardRotate : rotateResting,
                      opacity: isTop ? cardOpacity : 1,
                    }}
                    animate={{
                      y: yOffset,
                      scale: isTop ? 1 : scaleDown,
                    }}
                    drag={isTop ? 'x' : false}
                    dragConstraints={{ left: 0, right: 0 }}
                    dragElastic={0.7}
                    onDragEnd={isTop ? handleDragEnd : undefined}
                    onTap={isTop ? () => cycle() : undefined}
                    transition={{ type: 'spring', stiffness: 260, damping: 26 }}
                    className="absolute inset-0 rounded-3xl overflow-hidden select-none shadow-2xl border border-white/40"
                  >
                    {/* Photo */}
                    <div className="relative w-full h-[78%]">
                      <Image
                        src={card.src}
                        alt={card.name}
                        fill sizes="320px"
                        priority={isTop}
                        className="object-cover pointer-events-none"
                      />
                      {/* Vignette */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                      {/* Name badge on image */}
                      <div className="absolute bottom-4 left-5 right-5">
                        <h3 className="text-2xl md:text-3xl font-heading font-bold text-white tracking-widest drop-shadow-lg">
                          {card.name}
                        </h3>
                      </div>
                    </div>

                    {/* Card footer */}
                    <div
                      className="h-[22%] flex items-center justify-between px-5"
                      style={{
                        background: 'linear-gradient(135deg, #4a0c18 0%, #6B1022 100%)'
                      }}
                    >
                      <div>
                        <p className="text-label text-gold-soft/70 tracking-[0.18em]">
                          {card.subtitle}
                        </p>
                        <p className="font-subheading text-white/80 text-sm italic mt-0.5">
                          Ring Ceremony 2026
                        </p>
                      </div>
                      {/* Small heart */}
                      <span className="text-gold text-xl">♥</span>
                    </div>
                  </motion.div>
                )
              })}
            </AnimatePresence>
          </div>

          {/* Navigation dots */}
          <div className="flex items-center gap-3 mt-14">
            {CARDS.map((card) => {
              const isActive = cards[0]?.id === card.id
              return (
                <button
                  key={card.id}
                  onClick={() => {
                    setCards(prev => {
                      const copy = [...prev]
                      while (copy[0].id !== card.id) {
                        const first = copy.shift()
                        if (first) copy.push(first)
                      }
                      return copy
                    })
                  }}
                  className={`rounded-full transition-all duration-400 cursor-pointer
                    ${isActive
                      ? 'w-7 h-2.5 bg-gold shadow-[0_0_8px_rgba(201,168,76,0.6)]'
                      : 'w-2.5 h-2.5 bg-gold/25 hover:bg-gold/50'
                    }`}
                />
              )
            })}
          </div>

          {/* Swipe hint arrows */}
          <div className="flex items-center gap-8 mt-6">
            <button
              onClick={() => cycle('left')}
              className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center
                text-gold/40 hover:text-gold hover:border-gold/50 hover:bg-gold/5
                transition-all duration-300 cursor-pointer font-subheading text-lg"
            >
              ←
            </button>
            <button
              onClick={() => cycle('right')}
              className="w-10 h-10 rounded-full border border-gold/20 flex items-center justify-center
                text-gold/40 hover:text-gold hover:border-gold/50 hover:bg-gold/5
                transition-all duration-300 cursor-pointer font-subheading text-lg"
            >
              →
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
