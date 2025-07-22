"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { BookOpen, Search, Home } from "lucide-react"

interface NavbarProps {
  onNavigate: (view: string) => void
}

export function Navbar({ onNavigate }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
        scrolled ? "bg-black/80 backdrop-blur-lg border-b border-cyan-500/20" : "bg-transparent"
      }`}
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    >
      <div className="container mx-auto flex items-center justify-between">
        <motion.div
          className="flex items-center gap-2"
          whileHover={{ scale: 1.05 }}
          onClick={() => onNavigate("recommend")}
        >
          <div className="relative rounded-full">
            <div className="absolute inset-0 bg-cyan-500 blur-md opacity-70 rounded-full"></div>
            <BookOpen className="h-8 w-8 text-white relative z-10" />
          </div>
          <h1 className="text-xl font-bold tracking-wider relative">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-400">PSU</span>
            <span className="text-white">CourseFinder</span>
          </h1>
        </motion.div>

        <div className="flex items-center gap-4">
          <NavButton icon={<Home />} label="Recommend" onClick={() => onNavigate("recommend")} />
          <NavButton icon={<Search />} label="Browse" onClick={() => onNavigate("browse")} />
        </div>
      </div>
    </motion.nav>
  )
}

interface NavButtonProps {
  icon: React.ReactNode
  label: string
  onClick: () => void
}

function NavButton({ icon, label, onClick }: NavButtonProps) {
  return (
    <motion.button
      className="flex items-center gap-2 px-4 py-2 rounded-full bg-blue-900/30 border border-blue-800/50 hover:bg-blue-800/50 transition-colors"
      whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)" }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      {icon}
      <span className="hidden md:inline">{label}</span>
    </motion.button>
  )
}
