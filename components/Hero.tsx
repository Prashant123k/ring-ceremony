'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Scroll metrics for parallax effects
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  // Background scales up slightly, content moves up slightly faster
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"])
  const backgroundScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-100px"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0])

  // Canvas floating gold particles animation
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animationFrameId: number
    let width = (canvas.width = window.innerWidth)
    let height = (canvas.height = window.innerHeight)

    const particles: Array<{
      x: number
      y: number
      radius: number
      speedY: number
      speedX: number
      opacity: number
      fadeSpeed: number
    }> = []

    const createParticle = (isInit = false) => {
      return {
        x: Math.random() * width,
        y: isInit ? Math.random() * height : height + 10,
        radius: Math.random() * 2 + 0.8,
        speedY: -(Math.random() * 0.5 + 0.2),
        speedX: Math.random() * 0.4 - 0.2,
        opacity: Math.random() * 0.5 + 0.2,
        fadeSpeed: Math.random() * 0.002 + 0.001
      }
    }

    // Populate initial particles
    for (let i = 0; i < 40; i++) {
      particles.push(createParticle(true))
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, width, height)
      
      particles.forEach((p, idx) => {
        p.y += p.speedY
        p.x += p.speedX
        
        // Draw soft glow gold particle
        ctx.beginPath()
        const gradient = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 2)
        gradient.addColorStop(0, `rgba(212, 175, 55, ${p.opacity})`)
        gradient.addColorStop(0.5, `rgba(232, 216, 168, ${p.opacity * 0.5})`)
        gradient.addColorStop(1, 'rgba(212, 175, 55, 0)')
        
        ctx.fillStyle = gradient
        ctx.arc(p.x, p.y, p.radius * 2, 0, Math.PI * 2)
        ctx.fill()

        // Recycle if out of bounds or invisible
        if (p.y < -10 || p.x < -10 || p.x > width + 10) {
          particles[idx] = createParticle()
        }
      })

      animationFrameId = requestAnimationFrame(drawParticles)
    }

    drawParticles()

    const handleResize = () => {
      if (!canvas) return
      width = canvas.width = window.innerWidth
      height = canvas.height = window.innerHeight
    }

    window.addEventListener('resize', handleResize)

    return () => {
      cancelAnimationFrame(animationFrameId)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  return (
    <section 
      id="home"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center bg-maroon"
    >
      {/* Background Parallax Image */}
      <motion.div 
        style={{ y: backgroundY, scale: backgroundScale }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/couple-hero.png"
          alt="Prashant & Mitali"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Dark Cinematic Vignette & Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-maroon via-maroon/60 to-transparent" />
        <div className="absolute inset-0 bg-black/40" />
      </motion.div>

      {/* Floating Canvas Particles */}
      <canvas 
        ref={canvasRef} 
        className="absolute inset-0 pointer-events-none z-10 w-full h-full"
      />

      {/* Hero Typography Content */}
      <motion.div 
        style={{ y: contentY, opacity: contentOpacity }}
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.15, delayChildren: 0.6 } }
        }}
        className="relative z-20 text-center px-4 max-w-4xl flex flex-col items-center justify-center select-none"
      >
        {/* Top Mini Decoration */}
        <motion.p
          variants={{
            hidden: { opacity: 0, y: 15 },
            visible: { opacity: 0.8, y: 0 }
          }}
          className="text-xs md:text-sm font-subheading uppercase tracking-widest text-gold-soft mb-2"
        >
          The Wedding Celebration of
        </motion.p>

        {/* Prashant */}
        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl font-black tracking-widest text-[#FFFDF7] font-heading drop-shadow-md"
        >
          PRASHANT
        </motion.h1>

        {/* Heart Motif */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, scale: 0.5 },
            visible: { opacity: 1, scale: 1 }
          }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="my-3 text-gold text-2xl md:text-4xl animate-pulse"
        >
          ♥
        </motion.div>

        {/* Mitali */}
        <motion.h1 
          variants={{
            hidden: { opacity: 0, y: 30 },
            visible: { opacity: 1, y: 0 }
          }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl md:text-8xl font-black tracking-widest text-[#FFFDF7] font-heading drop-shadow-md"
        >
          MITALI
        </motion.h1>

        {/* Small gold line */}
        <motion.div 
          variants={{
            hidden: { scaleX: 0 },
            visible: { scaleX: 1 }
          }}
          transition={{ duration: 1.2, ease: "easeInOut" }}
          className="w-40 h-[1px] bg-gold my-6 origin-center"
        />

        {/* Event details */}
        <motion.div 
          variants={{
            hidden: { opacity: 0, y: 20 },
            visible: { opacity: 1, y: 0 }
          }}
          className="space-y-2 text-center"
        >
          <p className="text-xl md:text-2xl font-subheading italic text-gold-soft tracking-wider">
            Ring Ceremony
          </p>
          <div className="flex items-center justify-center space-x-4 text-sm md:text-base tracking-widest uppercase text-[#FFFDF7]/90 font-light mt-1">
            <span>19 July 2026</span>
            <span className="w-1.5 h-1.5 bg-gold rounded-full" />
            <span>5:00 PM</span>
          </div>
        </motion.div>

        {/* Discover indicator */}
        <motion.div
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 0.7 }
          }}
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-[-160px] md:bottom-[-200px] left-1/2 -translate-x-1/2 flex flex-col items-center space-y-2 cursor-pointer"
          onClick={() => {
            document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <span className="text-xs font-subheading tracking-widest uppercase text-gold-soft">
            Scroll To Discover
          </span>
          <span className="text-gold text-lg">↓</span>
        </motion.div>
      </motion.div>

      {/* Decorative Gold Frame Border */}
      <div className="absolute inset-4 md:inset-8 border border-gold/15 pointer-events-none z-20 rounded-sm" />
    </section>
  )
}
