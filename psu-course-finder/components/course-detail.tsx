"use client"

import { motion } from "framer-motion"
import type { Course } from "@/lib/types"
import { ArrowLeft, BookOpen } from "lucide-react"

interface CourseDetailProps {
  course: Course
  onBack: () => void
}

export function CourseDetail({ course, onBack }: CourseDetailProps) {
  return (
    <motion.div
      className="mt-24 max-w-4xl mx-auto"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
    >
      <motion.button
        className="flex items-center gap-2 mb-6 text-gray-300 hover:text-white transition-colors"
        whileHover={{ x: -5 }}
        onClick={onBack}
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to results</span>
      </motion.button>

      <div className="relative">
        {/* Glow effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-3xl opacity-50 blur-sm"></div>

        <div className="relative bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-3xl p-8">
          <div className="mb-6">
            <h1 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-2">
              {course.courseCode}
            </h1>
            <h2 className="text-xl text-white mb-2">{course.title}</h2>
            <span className="text-sm text-gray-300">{course.reviewCount} student reviews</span>
          </div>

          {course.description && (
            <motion.div
              className="mb-8 p-4 bg-blue-950/30 rounded-2xl border border-blue-900/50"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <div className="flex items-center gap-2 mb-2 text-cyan-400">
                <BookOpen className="w-4 h-4" />
                <h3 className="font-medium">Course Description</h3>
              </div>
              <p className="text-gray-300">{course.description}</p>
            </motion.div>
          )}

          <motion.div className="mb-8" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }}>
            <h3 className="text-lg font-medium text-cyan-400 mb-3">Top Keywords</h3>
            <div className="flex flex-wrap gap-2">
              {course.topKeywords?.map((keyword, i) => (
                <motion.span
                  key={keyword}
                  className="px-3 py-1.5 text-sm rounded-full bg-blue-900/50 border border-blue-700/50 text-cyan-300"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 10px rgba(0, 255, 255, 0.5)",
                    backgroundColor: "rgba(30, 64, 175, 0.5)",
                  }}
                >
                  {keyword}
                </motion.span>
              ))}
            </div>
          </motion.div>

          {course.topSnippets && course.topSnippets.length > 0 && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              <h3 className="text-lg font-medium text-cyan-400 mb-4">What Students Say</h3>
              <div className="space-y-4">
                {course.topSnippets.map((snippet, i) => (
                  <motion.div
                    key={i}
                    className="p-4 bg-blue-950/20 backdrop-blur-sm rounded-2xl border border-blue-900/30"
                    initial={{ opacity: 0, rotateX: -10 }}
                    animate={{ opacity: 1, rotateX: 0 }}
                    transition={{
                      delay: 0.7 + i * 0.2,
                      type: "spring",
                      stiffness: 100,
                    }}
                    whileHover={{
                      y: -5,
                      boxShadow: "0 10px 30px -15px rgba(0, 255, 255, 0.3)",
                    }}
                  >
                    <p className="text-gray-300 italic">"{snippet}"</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  )
}
