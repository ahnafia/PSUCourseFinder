"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search, Loader2 } from "lucide-react"

interface RecommendFormProps {
  onSubmit: (needs: string) => void
  isLoading: boolean
}

export function RecommendForm({ onSubmit, isLoading }: RecommendFormProps) {
  const [needs, setNeeds] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (needs.trim()) {
      onSubmit(needs.trim())
    }
  }

  return (
    <motion.div
      className="max-w-3xl mx-auto mt-24 text-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.h1
        className="text-4xl md:text-5xl font-bold mb-6"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-white">
          Discover your perfect Penn State courses
        </span>
      </motion.h1>

      <motion.p
        className="text-lg text-gray-300 mb-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.8 }}
      >
        Tell us what you're looking for in a course and we'll find the best matches
      </motion.p>

      <motion.form
        onSubmit={handleSubmit}
        className="relative max-w-2xl mx-auto"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.7, duration: 0.5 }}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-full opacity-50 blur-sm"></div>

          <div className="relative bg-black/60 backdrop-blur-sm rounded-full overflow-hidden border border-blue-500/20">
            <input
              type="text"
              value={needs}
              onChange={(e) => setNeeds(e.target.value)}
              placeholder="What do you need in a PSU course?"
              className="w-full px-6 py-4 bg-transparent text-white placeholder-gray-400 focus:outline-none text-lg"
              disabled={isLoading}
            />

            <motion.button
              type="submit"
              className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-gradient-to-r from-blue-700 to-cyan-600 text-white p-3 rounded-2xl"
              whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading || !needs.trim()}
            >
              {isLoading ? <Loader2 className="h-6 w-6 animate-spin" /> : <Search className="h-6 w-6" />}
            </motion.button>
          </div>
        </div>

        <motion.p
          className="text-sm text-gray-400 mt-3"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.5 }}
        >
          Try: "project-based with manageable workload" or "engaging professor for computer science"
        </motion.p>
      </motion.form>
    </motion.div>
  )
}
