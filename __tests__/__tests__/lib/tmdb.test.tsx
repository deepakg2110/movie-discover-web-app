import {
  getFeaturedMovie,
  getMoviesByMood,
  searchMovies,
  searchPeople,
  getMovieDetails,
  getSimilarMovies,
} from "@/lib/tmdb"

// Mock fetch
global.fetch = jest.fn()

describe("TMDB API Functions", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  describe("getFeaturedMovie", () => {
    it("returns a featured movie with details", async () => {
      // Mock the popular movies response
      const mockPopularResponse = {
        results: [{ id: 123, title: "Popular Movie", backdrop_path: "/backdrop.jpg" }],
      }

      // Mock the movie details response
      const mockDetailsResponse = {
        id: 123,
        title: "Popular Movie",
        backdrop_path: "/backdrop.jpg",
        genres: [{ id: 28, name: "Action" }],
      }

      // Set up the fetch mock to return different responses for different calls
      // @ts-ignore - mocking fetch
      global.fetch.mockImplementation((url) => {
        if (url.includes("/movie/popular")) {
          return Promise.resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(mockPopularResponse)),
          })
        } else if (url.includes("/movie/123")) {
          return Promise.resolve({
            ok: true,
            text: () => Promise.resolve(JSON.stringify(mockDetailsResponse)),
          })
        }
      })

      const result = await getFeaturedMovie()

      expect(result).toEqual(mockDetailsResponse)
      expect(global.fetch).toHaveBeenCalledTimes(2)
    })

    it("returns null when no movies with backdrop are found", async () => {
      // Mock response with no backdrop
      const mockResponse = {
        results: [{ id: 123, title: "Movie Without Backdrop", backdrop_path: null }],
      }

      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })

      const result = await getFeaturedMovie()

      expect(result).toBeNull()
    })
  })

  describe("getMoviesByMood", () => {
    it("fetches feel-good movies with correct genre parameters", async () => {
      const mockResponse = {
        results: [{ id: 1, title: "Happy Movie" }],
      }

      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })

      const result = await getMoviesByMood("feel-good")

      expect(result).toEqual(mockResponse.results)
      expect(global.fetch).toHaveBeenCalledTimes(1)

      const url = (global.fetch as jest.Mock).mock.calls[0][0].toString()
      expect(url).toContain("with_genres=35,10751") // Comedy, Family
    })

    it("fetches action-fix movies with correct genre parameters", async () => {
      const mockResponse = {
        results: [{ id: 1, title: "Action Movie" }],
      }

      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })

      const result = await getMoviesByMood("action-fix")

      expect(result).toEqual(mockResponse.results)

      const url = (global.fetch as jest.Mock).mock.calls[0][0].toString()
      expect(url).toContain("with_genres=28,12") // Action, Adventure
    })

    it("fetches mind-benders movies with correct genre parameters", async () => {
      const mockResponse = {
        results: [{ id: 1, title: "Mind Bending Movie" }],
      }

      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })

      const result = await getMoviesByMood("mind-benders")

      expect(result).toEqual(mockResponse.results)

      const url = (global.fetch as jest.Mock).mock.calls[0][0].toString()
      expect(url).toContain("with_genres=9648,53,878") // Mystery, Thriller, Sci-Fi
    })

    it("defaults to feel-good for unknown mood", async () => {
      const mockResponse = {
        results: [{ id: 1, title: "Default Movie" }],
      }

      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })

      const result = await getMoviesByMood("unknown-mood")

      expect(result).toEqual(mockResponse.results)

      const url = (global.fetch as jest.Mock).mock.calls[0][0].toString()
      expect(url).toContain("with_genres=35,10751") // Default to Comedy, Family
    })
  })

  describe("searchMovies", () => {
    it("searches movies with correct query parameter", async () => {
      const mockResponse = {
        results: [{ id: 1, title: "Search Result" }],
      }

      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })

      const result = await searchMovies("test query")

      expect(result).toEqual(mockResponse.results)

      const url = (global.fetch as jest.Mock).mock.calls[0][0].toString()
      expect(url).toContain("/search/movie")
      expect(url).toContain("query=test%20query")
    })
  })

  describe("searchPeople", () => {
    it("searches people with correct query parameter", async () => {
      const mockResponse = {
        results: [{ id: 1, name: "Actor Name" }],
      }

      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })

      const result = await searchPeople("actor name")

      expect(result).toEqual(mockResponse.results)

      const url = (global.fetch as jest.Mock).mock.calls[0][0].toString()
      expect(url).toContain("/search/person")
      expect(url).toContain("query=actor%20name")
    })
  })

  describe("getMovieDetails", () => {
    it("fetches movie details with correct ID and append parameters", async () => {
      const mockResponse = {
        id: 123,
        title: "Movie Details",
      }

      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })

      const result = await getMovieDetails("123")

      expect(result).toEqual(mockResponse)

      const url = (global.fetch as jest.Mock).mock.calls[0][0].toString()
      expect(url).toContain("/movie/123")
      expect(url).toContain("append_to_response=videos,credits,similar")
    })
  })

  describe("getSimilarMovies", () => {
    it("fetches similar movies with correct movie ID", async () => {
      const mockResponse = {
        results: [{ id: 456, title: "Similar Movie" }],
      }

      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })

      const result = await getSimilarMovies("123")

      expect(result).toEqual(mockResponse.results)

      const url = (global.fetch as jest.Mock).mock.calls[0][0].toString()
      expect(url).toContain("/movie/123/similar")
    })
  })

  describe("Error handling", () => {
    it("handles API errors gracefully", async () => {
      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
        text: () => Promise.resolve("Not Found"),
      })

      const result = await searchMovies("nonexistent")

      expect(result).toEqual([])
    })

    it("handles network errors gracefully", async () => {
      // @ts-ignore - mocking fetch
      global.fetch.mockRejectedValueOnce(new Error("Network Error"))

      const result = await searchMovies("test")

      expect(result).toEqual([])
    })

    it("handles rate limiting with retries", async () => {
      // Mock first call to return rate limit error
      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: false,
        status: 429,
        text: () => Promise.resolve("Too Many Requests"),
      })

      // Mock second call (retry) to succeed
      const mockResponse = {
        results: [{ id: 1, title: "Retry Success" }],
      }

      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve(JSON.stringify(mockResponse)),
      })

      // Mock setTimeout to resolve immediately for testing
      jest.useFakeTimers()

      const resultPromise = searchMovies("test")

      // Fast-forward timers to trigger retry
      jest.runAllTimers()

      const result = await resultPromise

      expect(result).toEqual(mockResponse.results)
      expect(global.fetch).toHaveBeenCalledTimes(2)

      jest.useRealTimers()
    })

    it("handles invalid JSON responses", async () => {
      // @ts-ignore - mocking fetch
      global.fetch.mockResolvedValueOnce({
        ok: true,
        text: () => Promise.resolve("Not valid JSON"),
      })

      const result = await searchMovies("test")

      expect(result).toEqual([])
    })
  })
})
