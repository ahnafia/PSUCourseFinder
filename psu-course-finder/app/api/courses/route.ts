import { NextResponse } from "next/server"
import type { Course } from "@/lib/types"

// Mock data for courses
const mockCourses: Course[] = [
  {
    courseCode: "CMPSC 132",
    title: "Programming and Computation II",
    avgSentiment: 0.85,
    topKeywords: ["object-oriented", "data structures", "algorithms"],
    reviewCount: 124,
  },
  {
    courseCode: "CMPSC 221",
    title: "Object Oriented Programming with Web-Based Applications",
    avgSentiment: 0.78,
    topKeywords: ["java", "web development", "practical"],
    reviewCount: 98,
  },
  {
    courseCode: "CMPSC 360",
    title: "Discrete Mathematics for Computer Science",
    avgSentiment: 0.65,
    topKeywords: ["challenging", "theoretical", "important"],
    reviewCount: 87,
  },
  {
    courseCode: "IST 256",
    title: "Programming for the Web",
    avgSentiment: 0.9,
    topKeywords: ["javascript", "html/css", "hands-on"],
    reviewCount: 112,
  },
  {
    courseCode: "IST 210",
    title: "Organization of Data",
    avgSentiment: 0.72,
    topKeywords: ["databases", "sql", "data modeling"],
    reviewCount: 76,
  },
  {
    courseCode: "COMM 269",
    title: "Photojournalism",
    avgSentiment: 0.82,
    topKeywords: ["creative", "practical", "portfolio-building"],
    reviewCount: 56,
  },
  {
    courseCode: "ENGL 202C",
    title: "Technical Writing",
    avgSentiment: 0.78,
    topKeywords: ["useful", "practical", "career-focused"],
    reviewCount: 143,
  },
  {
    courseCode: "STAT 200",
    title: "Elementary Statistics",
    avgSentiment: 0.75,
    topKeywords: ["practical", "well-organized", "clear"],
    reviewCount: 210,
  },
  {
    courseCode: "PSYCH 100",
    title: "Introductory Psychology",
    avgSentiment: 0.88,
    topKeywords: ["interesting", "thought-provoking", "well-taught"],
    reviewCount: 312,
  },
  {
    courseCode: "MGMT 301",
    title: "Basic Management Concepts",
    avgSentiment: 0.72,
    topKeywords: ["practical", "career-focused", "team-oriented"],
    reviewCount: 98,
  },
  {
    courseCode: "ART 101",
    title: "Introduction to Art",
    avgSentiment: 0.85,
    topKeywords: ["creative", "inspiring", "enjoyable"],
    reviewCount: 67,
  },
  {
    courseCode: "MATH 140",
    title: "Calculus With Analytic Geometry I",
    avgSentiment: 0.62,
    topKeywords: ["challenging", "fundamental", "rigorous"],
    reviewCount: 245,
  },
  {
    courseCode: "PHYS 211",
    title: "General Physics: Mechanics",
    avgSentiment: 0.68,
    topKeywords: ["challenging", "lab-based", "conceptual"],
    reviewCount: 178,
  },
  {
    courseCode: "ECON 102",
    title: "Introductory Microeconomic Analysis and Policy",
    avgSentiment: 0.76,
    topKeywords: ["interesting", "applicable", "well-structured"],
    reviewCount: 156,
  },
  {
    courseCode: "BIOL 110",
    title: "Basic Concepts and Biodiversity",
    avgSentiment: 0.79,
    topKeywords: ["interesting", "lab-based", "comprehensive"],
    reviewCount: 187,
  },
]

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const dept = searchParams.get("dept")
    const keyword = searchParams.get("keyword")
    const limit = Number.parseInt(searchParams.get("limit") || "20")
    const offset = Number.parseInt(searchParams.get("offset") || "0")

    // In a real implementation, this would call the backend API
    // For now, we'll filter the mock data based on the query parameters
    let filteredCourses = [...mockCourses]

    if (dept) {
      filteredCourses = filteredCourses.filter((course) => course.courseCode.startsWith(dept))
    }

    if (keyword) {
      filteredCourses = filteredCourses.filter((course) => {
        const courseText = [course.courseCode, course.title, ...course.topKeywords].join(" ").toLowerCase()

        return courseText.includes(keyword.toLowerCase())
      })
    }

    // Sort by sentiment score (highest first)
    filteredCourses.sort((a, b) => b.avgSentiment - a.avgSentiment)

    // Apply pagination
    const paginatedCourses = filteredCourses.slice(offset, offset + limit)

    return NextResponse.json(paginatedCourses)
  } catch (error) {
    console.error("Error in courses API:", error)
    return NextResponse.json({ error: "Failed to get courses" }, { status: 500 })
  }
}
