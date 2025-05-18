import type { Movie, Person } from "./types"

// Use the environment variable
const TMDB_API_KEY = process.env.TMDB_API_KEY

// Check if API key is available
if (!TMDB_API_KEY) {
  console.warn("TMDB_API_KEY is not defined. API requests will fail.")
}
const BASE_URL = "https://api.themoviedb.org/3"

async function fetchFromTMDB(endpoint: string, params: Record<string, string> = {}, retries = 3, delay = 1000): Promise<any> {
  const url = new URL(`${BASE_URL}${endpoint}`)
  url.searchParams.append("api_key", TMDB_API_KEY || "")
  Object.entries(params).forEach(([key, value]) => url.searchParams.append(key, value))

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const response = await fetch(url.toString(), { next: { revalidate: 3600 } })

      if (response.status === 429 && attempt < retries) {
        console.warn(`Rate limited, retrying after ${delay}ms...`)
        await new Promise((r) => setTimeout(r, delay))
        continue
      }

      if (!response.ok) {
        const errorText = await response.text()
        throw new Error(`TMDB API error: ${response.status} - ${errorText}`)
      }

      const text = await response.text()
      if (!text) return { results: [] }

      return JSON.parse(text)

    } catch (error: any) {
      console.error(`Attempt ${attempt} failed:`, error.message)
      if (attempt === retries) {
        return { results: [] }
      }
      await new Promise((r) => setTimeout(r, delay))
      delay *= 2 // Exponential backoff
    }
  }
}

// Get movies based on mood
export async function getMoviesByMood(mood: string): Promise<Movie[]> {
  const endpoint = "/discover/movie"
  const params: Record<string, string> = {
    language: "en-US",
    sort_by: "popularity.desc",
    include_adult: "false",
    page: "1",
  }

  // Configure different parameters based on mood
  switch (mood) {
    case "feel-good":
      params["with_genres"] = "35,10751" // Comedy, Family
      break
    case "action-fix":
      params["with_genres"] = "28,12" // Action, Adventure
      break
    case "mind-benders":
      params["with_genres"] = "9648,53,878" // Mystery, Thriller, Sci-Fi
      break
    default:
      params["with_genres"] = "35,10751" // Default to feel-good
  }

  const data = await fetchFromTMDB(endpoint, params)
  return data.results || []
}

// Search for movies
export async function searchMovies(query: string): Promise<Movie[]> {
  const data = await fetchFromTMDB("/search/movie", {
    query: query,
    language: "en-US",
    include_adult: "false",
    page: "1",
  })

  return data.results || []
}

// Search for people/actors
export async function searchPeople(query: string): Promise<Person[]> {
  const data = await fetchFromTMDB("/search/person", {
    query: query,
    language: "en-US",
    include_adult: "false",
    page: "1",
  })

  return data.results || []
}

// Get movie details
export async function getMovieDetails(id: string) {
  return fetchFromTMDB(`/movie/${id}`, {
    language: "en-US",
    append_to_response: "videos,credits,similar",
  })
}

// Get similar movies
export async function getSimilarMovies(id: string): Promise<Movie[]> {
  const data = await fetchFromTMDB(`/movie/${id}/similar`, {
    language: "en-US",
    page: "1",
  })

  return data.results || []
}
