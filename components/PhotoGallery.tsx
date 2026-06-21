'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useTransform } from 'framer-motion'
import Image from 'next/image'

interface Card {
  id: number
  src: string
  title: string
  desc: string
}

const INITIAL_CARDS: Card[] = [
  {
    id: 1,
    src: '/images/couple-1.png',
    title: 'Eyes Met, Hearts Connected',
    desc: 'The beginning of our beautiful story.'
  },
  {
    id: 2,
    src: '/images/couple-2.png',
    title: 'Hand in Hand',
    desc: 'A lifetime promise sealed with a ring.'
  },
  {
    id: 3,
    src: '/images/couple-3.png',
    title: 'Gilded Moments',
    desc: 'Walking together into a golden future.'
  },
  {
    id: 4,
    src: '/images/couple-4.png',
    title: 'The Promise of Forever',
    desc: 'Our hearts beat in harmony, now and always.'
  }
]

export default function PhotoGallery() {
  const [cards, setCards] = useState<Card[]>(INITIAL_CARDS)
  const [isHovered, setIsHovered] = useState(false)

  // Motion value for dragging the top card
  const dragX = useMotionValue(0)
  const rotateTransform = useTransform(dragX, [-150, 150], [-15, 15])
  const opacityTransform = useTransform(dragX, [-150, -100, 0, 100, 150], [0.5, 1, 1, 1, 0.5])

  const handleDragEnd = (event: any, info: any) => {
    const swipeThreshold = 100
    if (info.offset.x > swipeThreshold) {
      // Swiped right: move top card to bottom
      cycleStack()
    } else if (info.offset.x < -swipeThreshold) {
      // Swiped left: move top card to bottom
      cycleStack()
    }
  }

  const cycleStack = () => {
    setCards((prevCards) => {
      const copy = [...prevCards]
      const first = copy.shift()
      if (first) {
        copy.push(first)
      }
      return copy
    })
  }

  return (
    <section 
      id="gallery"
      className="relative min-h-[90vh] w-full flex flex-col items-center justify-center bg-luxury py-20 px-6 overflow-hidden border-b border-gold/10"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(212,175,55,0.02),transparent_70%)] pointer-events-none" />

      {/* Header */}
      <div className="text-center mb-12 relative z-10">
        <h2 className="text-3xl md:text-5xl font-bold tracking-widest text-maroon font-heading mb-3">
          Moments of Love
        </h2>
        <p className="text-sm md:text-base font-subheading text-gold tracking-widest uppercase">
          Drag / Swipe to see our journey
        </p>
      </div>

      {/* 3D Stack Container */}
      <div 
        className="relative w-[300px] h-[400px] md:w-[380px] md:h-[500px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <AnimatePresence mode="popLayout">
          {cards.map((card, index) => {
            const isTop = index === 0
            
            // 3D positioning layers
            // Fanning out style when hovered on desktop to show there are cards behind
            const fanOffset = isHovered ? (index * 12) : 0
            const rotationOffset = isHovered ? (index * 4 - 6) : (index === 1 ? 3 : index === 2 ? -3 : index === 3 ? 5 : 0)

            return (
              <motion.div
                key={card.id}
                style={isTop ? { x: dragX, rotate: rotateTransform, opacity: opacityTransform } : {}}
                drag={isTop ? 'x' : false}
                dragConstraints={{ left: 0, right: 0 }}
                onDragEnd={isTop ? handleDragEnd : undefined}
                animate={{
                  scale: 1 - index * 0.05,
                  y: index * 16 - fanOffset,
                  rotate: rotationOffset,
                  zIndex: 40 - index,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 300,
                  damping: 25
                }}
                className="absolute w-full h-full rounded-2xl overflow-hidden glass-card shadow-2xl origin-bottom select-none border border-gold/30"
              >
                {/* Image layout */}
                <div className="relative w-full h-[78%]">
                  <Image
                    src={card.src}
                    alt={card.title}
                    fill
                    sizes="(max-width: 768px) 300px, 380px"
                    priority={isTop}
                    className="object-cover pointer-events-none"
                  />
                  {/* Subtle vignette layer */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent pointer-events-none" />
                  
                  {/* Caption on the image itself */}
                  <div className="absolute bottom-4 left-4 right-4 z-20 text-[#FFFDF7]">
                    <h3 className="text-xl md:text-2xl font-subheading font-medium tracking-wide">
                      {card.title}
                    </h3>
                  </div>
                </div>

                {/* Card footer description */}
                <div className="h-[22%] bg-gradient-to-b from-[#4d0b17] to-maroon px-4 py-3 flex flex-col justify-center border-t border-gold/20 text-center">
                  <p className="text-sm md:text-base font-subheading text-gold-soft tracking-wider italic">
                    {card.desc}
                  </p>
                </div>
              </motion.div>
            )
          })}
        </AnimatePresence>
      </div>

      {/* Slide Navigation dot Indicators for the stack */}
      <div className="flex space-x-2 mt-8 z-10">
        {INITIAL_CARDS.map((item, idx) => {
          // Highlight dot based on which card is top
          const isActive = cards[0]?.id === item.id
          return (
            <button
              key={item.id}
              onClick={() => {
                // Rotate cards until the clicked card is at the top
                setCards((prevCards) => {
                  const copy = [...prevCards]
                  while (copy[0].id !== item.id) {
                    const first = copy.shift()
                    if (first) copy.push(first)
                  }
                  return copy
                })
              }}
              className={`h-2 rounded-full transition-all duration-300 ${
                isActive ? 'w-6 bg-gold' : 'w-2 bg-gold/30 hover:bg-gold/65'
              } cursor-pointer`}
            />
          )
        })}
      </div>
    </section>
  )
}
