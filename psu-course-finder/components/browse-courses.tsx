"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Search, Filter, Loader2 } from "lucide-react"
import type { Course } from "@/lib/types"
import { CourseList } from "@/components/course-list"

interface BrowseCoursesProps {
  courses: Course[]
  onSearch: (params: { dept?: string; keyword?: string }) => void
  onSelectCourse: (courseCode: string) => void
  isLoading: boolean
}

// Penn State departments
const DEPARTMENTS = [
  "ACCTG",
  "AERSP",
  "AFAM",
  "AG",
  "ANSC",
  "ANTH",
  "ARCH",
  "ART",
  "ASTRO",
  "BBH",
  "BIOL",
  "BMB",
  "BME",
  "CHEM",
  "CMPEN",
  "CMPSC",
  "COMM",
  "ECON",
  "EDUC",
  "EE",
  "EGEE",
  "ENGL",
  "ENGR",
  "ESC",
  "FIN",
  "GEOG",
  "GEOSC",
  "HIST",
  "IE",
  "IST",
  "KINES",
  "MATH",
  "ME",
  "METEO",
  "MGMT",
  "MIS",
  "MKTG",
  "MUSIC",
  "NURS",
  "NUTR",
  "PHIL",
  "PHYS",
  "PLSC",
  "PSY",
  "SCM",
  "SOC",
  "SPAN",
  "STAT",
  "THEA",
]

export function BrowseCourses({ courses, onSearch, onSelectCourse, isLoading }: BrowseCoursesProps) {
  const [department, setDepartment] = useState("")
  const [keyword, setKeyword] = useState("")
  const [showFilters, setShowFilters] = useState(false)

  useEffect(() => {
    // Initial search when component mounts
    if (courses.length === 0) {
      onSearch({})
    }
  }, [])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    onSearch({
      dept: department || undefined,
      keyword: keyword || undefined,
    })
  }

  return (
    <motion.div
      className="mt-24 max-w-4xl mx-auto"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1
        className="text-3xl font-bold mb-6 text-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
      >
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-cyan-400 to-white">
          Browse Penn State Courses
        </span>
      </motion.h1>

      <motion.form
        onSubmit={handleSearch}
        className="mb-8"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="relative mb-4">
          {/* Glow effect */}
          <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-cyan-400 rounded-2xl opacity-30 blur-sm"></div>

          <div className="relative flex bg-black/60 backdrop-blur-sm rounded-2xl overflow-hidden border border-blue-500/20">
            <input
              type="text"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="Search by keyword..."
              className="flex-1 px-4 py-3 bg-transparent text-white placeholder-gray-400 focus:outline-none"
              disabled={isLoading}
            />

            <motion.button
              type="button"
              className="px-3 text-gray-300 hover:text-white transition-colors"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setShowFilters(!showFilters)}
              disabled={isLoading}
            >
              <Filter className="h-5 w-5" />
            </motion.button>

            <motion.button
              type="submit"
              className="bg-gradient-to-r from-blue-700 to-cyan-600 text-white px-4 py-3"
              whileHover={{ boxShadow: "0 0 15px rgba(0, 255, 255, 0.5)" }}
              whileTap={{ scale: 0.95 }}
              disabled={isLoading}
            >
              {isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Search className="h-5 w-5" />}
            </motion.button>
          </div>
        </div>

        {showFilters && (
          <motion.div
            className="bg-black/60 backdrop-blur-sm border border-blue-500/30 rounded-xl p-6 mb-6"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="grid grid-cols-1 gap-6">
              <div>
                <label className="block text-gray-300 mb-2">Department</label>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full px-4 py-2 bg-blue-950/50 border border-blue-900/50 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-cyan-500"
                  disabled={isLoading}
                >
                  <option value="">All Departments</option>
                  {DEPARTMENTS.map((dept) => (
                    <option key={dept} value={dept}>
                      {dept}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </motion.form>

      {courses.length > 0 ? (
        <CourseList
          title={department ? `${department} Courses` : "All Courses"}
          courses={courses}
          onSelectCourse={onSelectCourse}
        />
      ) : (
        !isLoading && (
          <motion.div
            className="text-center py-12 text-gray-400"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            No courses found. Try adjusting your search criteria.
          </motion.div>
        )
      )}
    </motion.div>
  )
}
