'use client'

import { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "25%"])
  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.12])
  const contentY = useTransform(scrollYProgress, [0, 1], ["0px", "-80px"])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.6])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let W = (canvas.width = window.innerWidth)
    let H = (canvas.height = window.innerHeight)

    interface Particle {
      x: number; y: number; r: number
      vx: number; vy: number; o: number; life: number
    }

    const particles: Particle[] = []
    const count = 55

    const spawn = (randomY = false): Particle => ({
      x: Math.random() * W,
      y: randomY ? Math.random() * H : H + 5,
      r: Math.random() * 1.8 + 0.5,
      vx: (Math.random() - 0.5) * 0.3,
      vy: -(Math.random() * 0.45 + 0.15),
      o: Math.random() * 0.45 + 0.15,
      life: 0
    })

    for (let i = 0; i < count; i++) particles.push(spawn(true))

    const draw = () => {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy; p.life++

        const fade = Math.sin((p.life / 200) * Math.PI)
        const alpha = p.o * Math.max(fade, 0.1)

        const g = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 3)
        g.addColorStop(0, `rgba(212,175,55,${alpha})`)
        g.addColorStop(0.5, `rgba(226,208,154,${alpha * 0.4})`)
        g.addColorStop(1, 'rgba(212,175,55,0)')

        ctx.beginPath()
        ctx.fillStyle = g
        ctx.arc(p.x, p.y, p.r * 3, 0, Math.PI * 2)
        ctx.fill()

        if (p.y < -10 || p.life > 220) particles[i] = spawn()
      }
      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
    }
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', onResize) }
  }, [])

  return (
    <section
      id="home"
      ref={containerRef}
      className="relative h-screen w-full overflow-hidden flex items-center justify-center"
    >
      {/* Background Parallax Image */}
      <motion.div
        style={{ y: bgY, scale: bgScale }}
        className="absolute inset-0 w-full h-full"
      >
        <Image
          src="/images/couple-hero.png"
          alt="Prashant & Mitali"
          fill priority sizes="100vw"
          className="object-cover object-center"
        />
      </motion.div>

      {/* Cinematic Overlays */}
      <motion.div
        style={{ opacity: overlayOpacity }}
        className="absolute inset-0 z-[1]"
      >
        {/* Base dark layer */}
        <div className="absolute inset-0 bg-black/50" />
        {/* Bottom gradient pull */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#3d0813] via-[#3d0813]/40 to-transparent" />
        {/* Vignette edges */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.65) 100%)'
          }}
        />
      </motion.div>

      {/* Gold Particles Canvas */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 pointer-events-none z-[2] w-full h-full"
      />

      {/* Decorative Corner Frame */}
      <div className="absolute inset-5 md:inset-10 z-[3] pointer-events-none">
        {/* Corners */}
        {(['tl','tr','bl','br'] as const).map((pos) => (
          <div
            key={pos}
            className={`absolute w-10 h-10 md:w-14 md:h-14 border-gold/40
              ${pos === 'tl' ? 'top-0 left-0 border-t border-l' : ''}
              ${pos === 'tr' ? 'top-0 right-0 border-t border-r' : ''}
              ${pos === 'bl' ? 'bottom-0 left-0 border-b border-l' : ''}
              ${pos === 'br' ? 'bottom-0 right-0 border-b border-r' : ''}
            `}
          />
        ))}
      </div>

      {/* Hero Content */}
      <motion.div
        style={{ y: contentY, opacity: contentOpacity }}
        initial="hidden"
        animate="visible"
        variants={{ visible: { transition: { staggerChildren: 0.18, delayChildren: 0.5 } } }}
        className="relative z-[4] text-center px-6 max-w-5xl flex flex-col items-center select-none"
      >
        {/* Eyebrow label */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.8 }}
          className="text-label font-subheading text-soft-gold mb-8 tracking-[0.3em]"
        >
          ✦ &nbsp; The Ring Ceremony of &nbsp; ✦
        </motion.p>

        {/* Name: Prashant */}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-hero font-heading font-black text-cream leading-none tracking-[0.12em]"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}
        >
          PRASHANT
        </motion.h1>

        {/* Heart motif */}
        <motion.div
          variants={{ hidden: { opacity: 0, scale: 0.3 }, visible: { opacity: 1, scale: 1 } }}
          transition={{ duration: 0.9, ease: [0.34, 1.56, 0.64, 1] }}
          className="my-4 md:my-6 flex items-center gap-4"
        >
          <div className="h-[1px] w-12 md:w-20 bg-gradient-to-r from-transparent to-gold/70" />
          <span className="text-gold text-2xl md:text-3xl animate-heartbeat">♥</span>
          <div className="h-[1px] w-12 md:w-20 bg-gradient-to-l from-transparent to-gold/70" />
        </motion.div>

        {/* Name: Mitali */}
        <motion.h1
          variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-hero font-heading font-black text-cream leading-none tracking-[0.12em]"
          style={{ textShadow: '0 2px 40px rgba(0,0,0,0.5)' }}
        >
          MITALI
        </motion.h1>

        {/* Date & Time Row */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 24 }, visible: { opacity: 1, y: 0 } }}
          transition={{ duration: 0.9 }}
          className="mt-10 md:mt-12 flex flex-col items-center gap-3"
        >
          <p className="text-quote font-subheading italic text-gold-soft tracking-wider">
            Ring Ceremony
          </p>
          <div className="flex items-center gap-4 md:gap-6 text-label tracking-[0.22em] text-cream/80 font-light">
            <span>19 July 2026</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>Sunday</span>
            <span className="w-1 h-1 rounded-full bg-gold" />
            <span>5:00 PM</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 z-[4] flex flex-col items-center gap-3 cursor-pointer"
        onClick={() => document.getElementById('story')?.scrollIntoView({ behavior: 'smooth' })}
      >
        <span className="text-label text-gold-soft/70 tracking-[0.25em]">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-10 bg-gradient-to-b from-gold/60 to-transparent"
        />
      </motion.div>
    </section>
  )
}
