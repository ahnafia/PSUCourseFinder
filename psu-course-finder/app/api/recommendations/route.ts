import { NextResponse } from "next/server"
import type { Recommendation } from "@/lib/types"

// Mock data for recommendations
const mockRecommendations: Recommendation[] = [
  {
    courseCode: "CMPSC 132",
    title: "Programming and Computation II",
    matchScore: 95,
    highlights: [
      {
        text: "This course has many project-based assignments that help you learn by doing.",
        keyword: "project-based",
      },
    ],
    avgSentiment: 0.85,
    topKeywords: ["project-based", "practical", "challenging"],
    reviewCount: 124,
  },
  {
    courseCode: "IST 256",
    title: "Programming for the Web",
    matchScore: 92,
    highlights: [
      {
        text: "The professor makes complex concepts easy to understand with real-world examples.",
        keyword: "professor",
      },
    ],
    avgSentiment: 0.9,
    topKeywords: ["web development", "creative", "hands-on"],
    reviewCount: 87,
  },
  {
    courseCode: "COMM 269",
    title: "Photojournalism",
    matchScore: 88,
    highlights: [
      {
        text: "This course has a manageable workload while still being very educational.",
        keyword: "manageable workload",
      },
    ],
    avgSentiment: 0.82,
    topKeywords: ["creative", "practical", "engaging"],
    reviewCount: 56,
  },
  {
    courseCode: "ENGL 202C",
    title: "Technical Writing",
    matchScore: 85,
    highlights: [
      {
        text: "The professor is very engaging and provides detailed feedback on all assignments.",
        keyword: "professor",
      },
    ],
    avgSentiment: 0.78,
    topKeywords: ["useful", "practical", "career-focused"],
    reviewCount: 143,
  },
  {
    courseCode: "STAT 200",
    title: "Elementary Statistics",
    matchScore: 82,
    highlights: [
      {
        text: "The course has a manageable workload with clear expectations and helpful resources.",
        keyword: "manageable workload",
      },
    ],
    avgSentiment: 0.75,
    topKeywords: ["practical", "well-organized", "clear"],
    reviewCount: 210,
  },
  {
    courseCode: "PSYCH 100",
    title: "Introductory Psychology",
    matchScore: 80,
    highlights: [
      {
        text: "The professor makes the material interesting with engaging lectures and discussions.",
        keyword: "engaging",
      },
    ],
    avgSentiment: 0.88,
    topKeywords: ["interesting", "thought-provoking", "well-taught"],
    reviewCount: 312,
  },
  {
    courseCode: "MGMT 301",
    title: "Basic Management Concepts",
    matchScore: 78,
    highlights: [
      {
        text: "This course includes several project-based assignments that apply concepts to real scenarios.",
        keyword: "project-based",
      },
    ],
    avgSentiment: 0.72,
    topKeywords: ["practical", "career-focused", "team-oriented"],
    reviewCount: 98,
  },
  {
    courseCode: "ART 101",
    title: "Introduction to Art",
    matchScore: 75,
    highlights: [
      {
        text: "The professor is passionate and makes art history accessible to everyone.",
        keyword: "professor",
      },
    ],
    avgSentiment: 0.85,
    topKeywords: ["creative", "inspiring", "enjoyable"],
    reviewCount: 67,
  },
]

export async function POST(request: Request) {
  try {
    const { needs, limit = 10 } = await request.json()

    // In a real implementation, this would call the backend API
    // For now, we'll filter the mock data based on the needs text
    let filteredRecommendations = [...mockRecommendations]

    if (needs) {
      const keywords = needs.toLowerCase().split(" ")

      // Simple keyword matching - in a real app, this would be done by the backend
      filteredRecommendations = mockRecommendations.filter((course) => {
        const courseText = [course.title, ...course.topKeywords, ...course.highlights.map((h) => h.text)]
          .join(" ")
          .toLowerCase()

        return keywords.some((keyword) => courseText.includes(keyword))
      })

      // Sort by match score
      filteredRecommendations.sort((a, b) => b.matchScore - a.matchScore)
    }

    return NextResponse.json(filteredRecommendations.slice(0, limit))
  } catch (error) {
    console.error("Error in recommendations API:", error)
    return NextResponse.json({ error: "Failed to get recommendations" }, { status: 500 })
  }
}
