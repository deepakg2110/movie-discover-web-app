import { NextResponse } from "next/server"

// This is a simple API route to proxy TMDB requests
// In a real application, you would use this to hide your API key
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const endpoint = searchParams.get("endpoint")

  if (!endpoint) {
    return NextResponse.json({ error: "Missing endpoint parameter" }, { status: 400 })
  }

  // Remove the endpoint parameter and keep the rest
  searchParams.delete("endpoint")

  // Use the environment variable
  const TMDB_API_KEY = process.env.TMDB_API_KEY

  if (!TMDB_API_KEY) {
    return NextResponse.json({ error: "TMDB API key is not configured" }, { status: 500 })
  }
  const BASE_URL = "https://api.themoviedb.org/3"

  const url = new URL(`${BASE_URL}${endpoint}`)

  // Add API key
  url.searchParams.append("api_key", TMDB_API_KEY)

  // Add all other search params
  searchParams.forEach((value, key) => {
    url.searchParams.append(key, value)
  })

  try {
    const response = await fetch(url.toString())

    // Handle rate limiting
    if (response.status === 429) {
      return NextResponse.json({ error: "Too many requests to TMDB API. Please try again later." }, { status: 429 })
    }

    if (!response.ok) {
      const errorText = await response.text()
      return NextResponse.json(
        { error: `TMDB API error: ${response.status} - ${errorText}` },
        { status: response.status },
      )
    }

    // Check if the response is empty
    const text = await response.text()
    if (!text) {
      return NextResponse.json({ results: [] })
    }

    // Parse the JSON safely
    try {
      const data = JSON.parse(text)
      return NextResponse.json(data)
    } catch (parseError) {
      console.error("Error parsing JSON:", parseError)
      return NextResponse.json({ error: "Failed to parse TMDB response" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error fetching from TMDB:", error)
    return NextResponse.json({ error: "Failed to fetch from TMDB" }, { status: 500 })
  }
}
