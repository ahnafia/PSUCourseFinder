"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Navbar } from "@/components/navbar"
import { RecommendForm } from "@/components/recommend-form"
import { CourseList } from "@/components/course-list"
import { CourseDetail } from "@/components/course-detail"
import { BrowseCourses } from "@/components/browse-courses"
import type { Course, Recommendation } from "@/lib/types"
import { AnimatedBackground } from "@/components/animated-background"

export default function Home() {
  const router = useRouter()
  const [view, setView] = useState<"recommend" | "browse" | "detail">("recommend")
  const [recommendations, setRecommendations] = useState<Recommendation[]>([])
  const [courses, setCourses] = useState<Course[]>([])
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleGetRecommendations = async (needs: string) => {
    setIsLoading(true)
    try {
      // const response = await fetch("/api/recommendations", {
      //   method: "POST",
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      //   body: JSON.stringify({ needs, limit: 10 }),
      // })

      // if (!response.ok) throw new Error("Failed to fetch recommendations")

      // const data = await response.json()

      // Mock random recommendations for testing
      const mockRecommendations = [
        {
          courseCode: "CMPSC 132",
          title: "Programming and Computation II",
          matchScore: Math.floor(Math.random() * 30) + 70, // 70-100%
          highlights: [
            {
              text: `This course has many ${needs.toLowerCase()} elements that help you learn effectively.`,
              keyword: needs.split(" ")[0],
            },
          ],
          avgSentiment: 0.85,
          topKeywords: ["project-based", "practical", "challenging"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "IST 256",
          title: "Programming for the Web",
          matchScore: Math.floor(Math.random() * 30) + 70,
          highlights: [
            {
              text: `Students love how this course incorporates ${needs.toLowerCase()} into the curriculum.`,
              keyword: needs.split(" ")[1] || needs.split(" ")[0],
            },
          ],
          avgSentiment: 0.9,
          topKeywords: ["web development", "creative", "hands-on"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "COMM 269",
          title: "Photojournalism",
          matchScore: Math.floor(Math.random() * 30) + 70,
          highlights: [
            {
              text: `Perfect for students seeking ${needs.toLowerCase()} in their academic experience.`,
              keyword: needs.split(" ")[0],
            },
          ],
          avgSentiment: 0.82,
          topKeywords: ["creative", "practical", "engaging"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "ENGL 202C",
          title: "Technical Writing",
          matchScore: Math.floor(Math.random() * 30) + 70,
          highlights: [
            {
              text: `This course delivers exactly what you're looking for: ${needs.toLowerCase()}.`,
              keyword: needs.split(" ")[0],
            },
          ],
          avgSentiment: 0.78,
          topKeywords: ["useful", "practical", "career-focused"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "STAT 200",
          title: "Elementary Statistics",
          matchScore: Math.floor(Math.random() * 30) + 70,
          highlights: [
            {
              text: `Great course that emphasizes ${needs.toLowerCase()} throughout the semester.`,
              keyword: needs.split(" ")[0],
            },
          ],
          avgSentiment: 0.75,
          topKeywords: ["practical", "well-organized", "clear"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
      ]

      setRecommendations(mockRecommendations)
      setView("recommend")
    } catch (error) {
      console.error("Error fetching recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleBrowseCourses = async (params: { dept?: string; keyword?: string }) => {
    setIsLoading(true)
    try {
      // const queryParams = new URLSearchParams()
      // if (params.dept) queryParams.append("dept", params.dept)
      // if (params.keyword) queryParams.append("keyword", params.keyword)
      // queryParams.append("limit", "20")

      // const response = await fetch(`/api/courses?${queryParams.toString()}`)

      // if (!response.ok) throw new Error("Failed to fetch courses")

      // const data = await response.json()

      // Mock random courses for testing
      const allMockCourses = [
        {
          courseCode: "CMPSC 132",
          title: "Programming and Computation II",
          avgSentiment: 0.85,
          topKeywords: ["object-oriented", "data structures", "algorithms"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "IST 256",
          title: "Programming for the Web",
          avgSentiment: 0.9,
          topKeywords: ["javascript", "html/css", "hands-on"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "COMM 269",
          title: "Photojournalism",
          avgSentiment: 0.82,
          topKeywords: ["creative", "practical", "portfolio-building"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "ENGL 202C",
          title: "Technical Writing",
          avgSentiment: 0.78,
          topKeywords: ["useful", "practical", "career-focused"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "STAT 200",
          title: "Elementary Statistics",
          avgSentiment: 0.75,
          topKeywords: ["practical", "well-organized", "clear"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "PSYCH 100",
          title: "Introductory Psychology",
          avgSentiment: 0.88,
          topKeywords: ["interesting", "thought-provoking", "well-taught"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "MATH 140",
          title: "Calculus With Analytic Geometry I",
          avgSentiment: 0.62,
          topKeywords: ["challenging", "fundamental", "rigorous"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
        {
          courseCode: "PHYS 211",
          title: "General Physics: Mechanics",
          avgSentiment: 0.68,
          topKeywords: ["challenging", "lab-based", "conceptual"],
          reviewCount: Math.floor(Math.random() * 200) + 50,
        },
      ]

      // Filter by department if specified
      let filteredCourses = params.dept
        ? allMockCourses.filter((course) => course.courseCode.startsWith(params.dept!))
        : allMockCourses

      // Shuffle the results to make them appear random
      filteredCourses = filteredCourses.sort(() => Math.random() - 0.5)

      setCourses(filteredCourses)
      setView("browse")
    } catch (error) {
      console.error("Error fetching courses:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewCourseDetail = async (courseCode: string) => {
    setIsLoading(true)
    try {
      // const response = await fetch(`/api/courses/${courseCode}`)

      // if (!response.ok) throw new Error("Failed to fetch course details")

      // const data = await response.json()

      // Mock course detail data
      const mockCourseDetail = {
        courseCode: courseCode,
        title: `Sample Course Title for ${courseCode}`,
        description: `This is a comprehensive course covering various aspects of the subject matter. Students will engage in hands-on learning experiences and develop practical skills relevant to their field of study.`,
        avgSentiment: Math.random() * 0.4 + 0.6, // 0.6 to 1.0
        topKeywords: ["engaging", "practical", "well-structured", "informative", "challenging"],
        reviewCount: Math.floor(Math.random() * 300) + 50,
        topSnippets: [
          "This course really helped me understand the fundamentals and apply them in real-world scenarios.",
          "The professor was engaging and made complex topics easy to understand.",
          "Great hands-on experience with plenty of practical examples.",
          "Well-organized course with clear expectations and helpful resources.",
          "Challenging but rewarding - definitely recommend to other students.",
        ],
      }

      setSelectedCourse(mockCourseDetail)
      setView("detail")
    } catch (error) {
      console.error("Error fetching course details:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <main className="min-h-screen bg-black text-white overflow-hidden relative">
      <AnimatedBackground />
      <div className="container mx-auto px-4 py-8 relative z-10">
        <Navbar onNavigate={(view) => setView(view as "recommend" | "browse" | "detail")} />

        {view === "recommend" && (
          <div className="mt-8 space-y-8">
            <RecommendForm onSubmit={handleGetRecommendations} isLoading={isLoading} />
            {recommendations.length > 0 && (
              <CourseList
                title="Recommended Courses"
                courses={recommendations}
                onSelectCourse={handleViewCourseDetail}
                isRecommendation
              />
            )}
          </div>
        )}

        {view === "browse" && (
          <BrowseCourses
            courses={courses}
            onSearch={handleBrowseCourses}
            onSelectCourse={handleViewCourseDetail}
            isLoading={isLoading}
          />
        )}

        {view === "detail" && selectedCourse && (
          <CourseDetail
            course={selectedCourse}
            onBack={() => setView(recommendations.length > 0 ? "recommend" : "browse")}
          />
        )}
      </div>
    </main>
  )
}
