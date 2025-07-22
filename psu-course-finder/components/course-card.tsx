"use client"

import { motion } from "framer-motion"
import type { Course, Recommendation } from "@/lib/types"
import { ChevronRight } from "lucide-react"

interface CourseCardProps {
  course: Course | Recommendation
  onSelect: () => void
  delay?: number
  isRecommendation?: boolean
}

export function CourseCard({ course, onSelect, delay = 0, isRecommendation = false }: CourseCardProps) {
  // Type guard to check if the course is a recommendation
  const isRecommendationCourse = (course: Course | Recommendation): course is Recommendation => {
    return "matchScore" in course && "highlights" in course
  }

  const matchScore = isRecommendationCourse(course) ? course.matchScore : null
  const highlights = isRecommendationCourse(course) ? course.highlights : []

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl opacity-50 blur-sm group-hover:opacity-100 transition duration-300"></div>

      <div className="relative bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-6 h-full flex flex-col">
        <div className="flex justify-between items-start mb-3">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">
            {course.courseCode}
          </h3>

          {isRecommendation && matchScore !== null && (
            <div className="relative">
              <svg className="w-12 h-12">
                <circle cx="24" cy="24" r="20" fill="none" stroke="#0f172a" strokeWidth="4" />
                <motion.circle
                  cx="24"
                  cy="24"
                  r="20"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="4"
                  strokeLinecap="round"
                  initial={{ strokeDasharray: 126, strokeDashoffset: 126 }}
                  animate={{ strokeDashoffset: 126 - (matchScore / 100) * 126 }}
                  transition={{ duration: 1, delay: delay + 0.5 }}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#22d3ee" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-sm font-bold">
                {Math.round(matchScore)}%
              </div>
            </div>
          )}
        </div>

        <h4 className="text-white mb-3">{course.title}</h4>

        <div className="flex flex-wrap gap-2 mb-4">
          {course.topKeywords?.slice(0, 3).map((keyword, i) => (
            <motion.span
              key={keyword}
              className="px-2 py-1 text-xs rounded-full bg-blue-900/50 border border-blue-700/50 text-cyan-300"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: delay + 0.2 + i * 0.1 }}
            >
              {keyword}
            </motion.span>
          ))}
        </div>

        {isRecommendation && highlights && highlights.length > 0 && (
          <motion.div
            className="mb-4 text-sm text-gray-300"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + 0.5 }}
          >
            <TypewriterText text={highlights[0].text} keyword={highlights[0].keyword} delay={delay + 0.7} />
          </motion.div>
        )}

        <div className="text-xs text-gray-400 mt-auto">{course.reviewCount} student reviews</div>

        <motion.button
          className="absolute bottom-4 right-4 p-2 rounded-2xl bg-blue-900/50 text-white hover:bg-blue-800/70 transition-colors"
          whileHover={{ scale: 1.1, boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)" }}
          whileTap={{ scale: 0.9 }}
          onClick={onSelect}
        >
          <ChevronRight className="w-4 h-4" />
        </motion.button>
      </div>
    </motion.div>
  )
}

interface TypewriterTextProps {
  text: string
  keyword: string
  delay: number
}

function TypewriterText({ text, keyword, delay }: TypewriterTextProps) {
  const parts = text.split(new RegExp(`(${keyword})`, "gi"))

  return (
    <span>
      {parts.map((part, i) => {
        const isKeyword = part.toLowerCase() === keyword.toLowerCase()

        return (
          <motion.span
            key={i}
            className={isKeyword ? "text-cyan-400 font-medium" : ""}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: delay + i * 0.05 }}
          >
            {part}
          </motion.span>
        )
      })}
    </span>
  )
}
