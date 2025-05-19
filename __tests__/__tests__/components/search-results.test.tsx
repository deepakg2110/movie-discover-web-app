import { render, screen } from "@testing-library/react"
import SearchResults from "@/components/search-results"
import { searchMovies, searchPeople } from "@/lib/tmdb"

// Mock the API functions and components
jest.mock("@/lib/tmdb", () => ({
  searchMovies: jest.fn(),
  searchPeople: jest.fn(),
}))

jest.mock("@/components/movie-card", () => ({
  __esModule: true,
  default: ({ movie }: any) => <div data-testid="movie-card">{movie.title}</div>,
}))

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src || "/placeholder.svg"} alt={alt} data-testid="person-image" />,
}))

describe("SearchResults Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders both movies and people search results", async () => {
    const mockMovies = [
      { id: 1, title: "Test Movie" },
      { id: 2, title: "Another Movie" },
    ]
    
    const mockPeople = [
      { 
        id: 1, 
        name: "Actor Name", 
        profile_path: "/profile.jpg",
        known_for: [{ title: "Famous Movie" }] 
      },
    ]
    
    // @ts-ignore - mocking implementation
    searchMovies.mockResolvedValue(mockMovies)
    // @ts-ignore - mocking implementation
    searchPeople.mockResolvedValue(mockPeople)
    
    render(await SearchResults({ query: "test" }))
    
    expect(searchMovies).toHaveBeenCalledWith("test")
    expect(searchPeople).toHaveBeenCalledWith("test")
    
    expect(screen.getByText("Movies")).toBeInTheDocument()
    expect(screen.getByText("Actors")).toBeInTheDocument()
    expect(screen.getByText("Test Movie")).toBeInTheDocument()
    expect(screen.getByText("Actor Name")).toBeInTheDocument()
  })

  it("renders only movies when no people are found", async () => {
    const mockMovies = [{ id: 1, title: "Test Movie" }]
    
    // @ts-ignore - mocking implementation
    searchMovies.mockResolvedValue(mockMovies)
    // @ts-ignore - mocking implementation
    searchPeople.mockResolvedValue([])
    
    render(await SearchResults({ query: "test" }))
    
    expect(screen.getByText("Movies")).toBeInTheDocument()
    expect(screen.queryByText("Actors")).not.toBeInTheDocument()
  })

  it("renders only people when no movies are found", async () => {
    const mockPeople = [{ 
      id: 1, 
      name: "Actor Name", 
      profile_path: "/profile.jpg",
      known_for: [{ title: "Famous Movie" }] 
    }]
    
    // @ts-ignore - mocking implementation
    searchMovies.mockResolvedValue([])
    // @ts-ignore - mocking implementation
    searchPeople.mockResolvedValue(mockPeople)
    
    render(await SearchResults({ query: "test" }))
    
    expect(screen.queryByText("Movies")).not.toBeInTheDocument()
    expect(screen.getByText("Actors")).toBeInTheDocument()
  })

  it("shows message when no results are found", async () => {
    // @ts-ignore - mocking implementation
    searchMovies.mockResolvedValue([])
    // @ts-ignore - mocking implementation
    searchPeople.mockResolvedValue([])
    
    render(await SearchResults({ query: "nonexistent" }))
    
    expect(screen.getByText('No results found for "nonexistent". Try a different search term.')).toBeInTheDocument()
  })

  it("handles API errors gracefully", async () => {
    // @ts-ignore - mocking implementation
    searchMovies.mockRejectedValue(new Error("API Error"))
    // @ts-ignore - mocking implementation
    searchPeople.mockRejectedValue(new Error("API Error"))
    
    render(await SearchResults({ query: "test" }))
    
    expect(screen.getByText("Error")).toBeInTheDocument()
    expect(screen.getByText('There was a problem searching for "test". Please try again later.')).toBeInTheDocument()
  })

  it("handles person without profile image", async () => {
    const mockPeople = [{ 
      id: 1, 
      name: "Actor Name", 
      profile_path: null,
      known_for: [{ title: "Famous Movie" }] 
    }]
    
    // @ts-ignore - mocking implementation
    searchMovies.mockResolvedValue([])
    // @ts-ignore - mocking implementation
    searchPeople.mockResolvedValue(mockPeople)
    
    render(await SearchResults({ query: "test" }))
    
    expect(screen.getByText("No image")).toBeInTheDocument()
  })
})
