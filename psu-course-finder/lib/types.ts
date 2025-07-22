export interface Course {
  courseCode: string
  title: string
  description?: string
  avgSentiment: number
  topKeywords: string[]
  reviewCount: number
  topSnippets?: string[]
}

export interface Recommendation {
  courseCode: string
  title: string
  matchScore: number
  highlights: {
    text: string
    keyword: string
  }[]
  avgSentiment: number
  topKeywords: string[]
  reviewCount: number
}
