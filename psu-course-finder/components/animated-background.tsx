"use client"

import { useEffect, useRef } from "react"
import { motion } from "framer-motion"

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }

    resizeCanvas()
    window.addEventListener("resize", resizeCanvas)

    // Create particles
    const particles: Particle[] = []
    // Reduce particle count for minimalism
    const particleCount = 30

    class Particle {
      x: number
      y: number
      size: number
      speedX: number
      speedY: number
      color: string

      constructor() {
        this.x = Math.random() * canvas.width
        this.y = Math.random() * canvas.height
        this.size = Math.random() * 2 + 0.5
        this.speedX = Math.random() * 0.5 - 0.25
        this.speedY = Math.random() * 0.5 - 0.25

        // Penn State colors with opacity
        // Make colors more subtle
        const colors = [
          "rgba(0, 45, 114, 0.3)", // Penn State Blue
          "rgba(0, 156, 222, 0.3)", // Cyan
          "rgba(255, 255, 255, 0.2)", // White
        ]

        this.color = colors[Math.floor(Math.random() * colors.length)]
      }

      update() {
        this.x += this.speedX
        this.y += this.speedY

        // Wrap around edges
        if (this.x > canvas.width) this.x = 0
        else if (this.x < 0) this.x = canvas.width

        if (this.y > canvas.height) this.y = 0
        else if (this.y < 0) this.y = canvas.height
      }

      draw() {
        if (!ctx) return
        ctx.fillStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
        ctx.fill()
      }
    }

    // Initialize particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle())
    }

    // Animation loop
    const animate = () => {
      // Create gradient background
      const gradient = ctx.createLinearGradient(0, 0, 0, canvas.height)
      gradient.addColorStop(0, "rgba(0, 0, 0, 1)")
      gradient.addColorStop(1, "rgba(0, 20, 50, 1)")

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Update and draw particles
      particles.forEach((particle) => {
        particle.update()
        particle.draw()
      })

      // Draw connections between particles
      connectParticles()

      requestAnimationFrame(animate)
    }

    // Connect particles with lines if they're close enough
    const connectParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const distance = Math.sqrt(dx * dx + dy * dy)

          if (distance < 80) {
            ctx.beginPath()
            ctx.strokeStyle = `rgba(0, 156, 222, ${0.05 * (1 - distance / 80)})`
            ctx.lineWidth = 0.3
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.stroke()
          }
        }
      }
    }

    animate()

    return () => {
      window.removeEventListener("resize", resizeCanvas)
    }
  }, [])

  return (
    <>
      <canvas ref={canvasRef} className="fixed top-0 left-0 w-full h-full -z-10" />
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-black/70 -z-10" />

      {/* Animated glow effects */}
      <motion.div
        className="fixed top-1/4 left-1/4 w-64 h-64 rounded-full bg-blue-600/20 blur-3xl -z-10"
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.3, 0.5, 0.3],
        }}
        transition={{
          duration: 8,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
        }}
      />

      <motion.div
        className="fixed bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-cyan-500/10 blur-3xl -z-10"
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{
          duration: 10,
          repeat: Number.POSITIVE_INFINITY,
          repeatType: "reverse",
          delay: 2,
        }}
      />
    </>
  )
}
