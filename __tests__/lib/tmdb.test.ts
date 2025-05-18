import { getMoviesByMood, searchMovies, searchPeople, getMovieDetails } from "@/lib/tmdb"

// Mock the fetch function
global.fetch = jest.fn()

describe("TMDB API Functions", () => {
  beforeEach(() => {
    jest.resetAllMocks()
  })

  it("getMoviesByMood fetches movies with correct parameters", async () => {
    // Mock successful response
    const mockResponse = {
      results: [{ id: 1, title: "Test Movie" }],
    }

    // @ts-ignore - mocking fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await getMoviesByMood("feel-good")

    // Check if fetch was called with correct URL
    expect(global.fetch).toHaveBeenCalledTimes(1)
    const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0]

    // Check if URL contains correct parameters
    expect(fetchUrl).toContain("/discover/movie")
    expect(fetchUrl).toContain("with_genres=35,10751") // Comedy, Family genres

    // Check if result is correct
    expect(result).toEqual(mockResponse.results)
  })

  it("searchMovies fetches with correct query parameter", async () => {
    // Mock successful response
    const mockResponse = {
      results: [{ id: 1, title: "Test Movie" }],
    }

    // @ts-ignore - mocking fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await searchMovies("test query")

    // Check if fetch was called with correct URL
    expect(global.fetch).toHaveBeenCalledTimes(1)
    const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0]

    // Check if URL contains correct parameters
    expect(fetchUrl).toContain("/search/movie")
    expect(fetchUrl).toContain("query=test%20query")

    // Check if result is correct
    expect(result).toEqual(mockResponse.results)
  })

  it("handles API errors gracefully", async () => {
    // Mock failed response
    // @ts-ignore - mocking fetch
    global.fetch.mockResolvedValueOnce({
      ok: false,
      status: 404,
    })

    const result = await searchPeople("nonexistent")

    // Should return empty array on error
    expect(result).toEqual([])
  })

  it("getMovieDetails fetches with correct movie ID", async () => {
    // Mock successful response
    const mockResponse = {
      id: 123,
      title: "Test Movie",
    }

    // @ts-ignore - mocking fetch
    global.fetch.mockResolvedValueOnce({
      ok: true,
      json: async () => mockResponse,
    })

    const result = await getMovieDetails("123")

    // Check if fetch was called with correct URL
    expect(global.fetch).toHaveBeenCalledTimes(1)
    const fetchUrl = (global.fetch as jest.Mock).mock.calls[0][0]

    // Check if URL contains correct parameters
    expect(fetchUrl).toContain("/movie/123")
    expect(fetchUrl).toContain("append_to_response=videos,credits,similar")

    // Check if result is correct
    expect(result).toEqual(mockResponse)
  })
})
