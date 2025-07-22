"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import type { Course, Recommendation } from "@/lib/types"
import { CourseCard } from "@/components/course-card"

interface CourseListProps {
  title: string
  courses: Course[] | Recommendation[]
  onSelectCourse: (courseCode: string) => void
  isRecommendation?: boolean
}

export function CourseList({ title, courses, onSelectCourse, isRecommendation = false }: CourseListProps) {
  const [visibleCount, setVisibleCount] = useState(6)

  const loadMore = () => {
    setVisibleCount((prev) => Math.min(prev + 6, courses.length))
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-16"
    >
      <h2 className="text-2xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-400">
        {title}
      </h2>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        variants={container}
        initial="hidden"
        animate="show"
      >
        {courses.slice(0, visibleCount).map((course, index) => (
          <CourseCard
            key={course.courseCode}
            course={course}
            onSelect={() => onSelectCourse(course.courseCode)}
            delay={index * 0.1}
            isRecommendation={isRecommendation}
          />
        ))}
      </motion.div>

      {visibleCount < courses.length && (
        <motion.div
          className="flex justify-center mt-8"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <motion.button
            className="px-6 py-3 bg-blue-900/50 border border-blue-700/50 rounded-full text-white hover:bg-blue-800/50 transition-colors"
            whileHover={{ scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 255, 0.3)" }}
            whileTap={{ scale: 0.95 }}
            onClick={loadMore}
          >
            Load More
          </motion.button>
        </motion.div>
      )}
    </motion.div>
  )
}
