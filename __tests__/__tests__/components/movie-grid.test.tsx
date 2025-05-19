import { render, screen } from "@testing-library/react"
import MovieGrid from "@/components/movie-grid"
import { getMoviesByMood } from "@/lib/tmdb"

// Mock the API function and MovieCard component
jest.mock("@/lib/tmdb", () => ({
  getMoviesByMood: jest.fn(),
}))

jest.mock("@/components/movie-card", () => ({
  __esModule: true,
  default: ({ movie }: any) => <div data-testid="movie-card">{movie.title}</div>,
}))

describe("MovieGrid Component", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders movies for feel-good mood", async () => {
    const mockMovies = [
      { id: 1, title: "Happy Movie" },
      { id: 2, title: "Fun Times" },
    ]
    
    // @ts-ignore - mocking implementation
    getMoviesByMood.mockResolvedValue(mockMovies)
    
    render(await MovieGrid({ mood: "feel-good" }))
    
    expect(getMoviesByMood).toHaveBeenCalledWith("feel-good")
    expect(screen.getByText("Feel Good Movies")).toBeInTheDocument()
    expect(screen.getByText("Happy Movie")).toBeInTheDocument()
    expect(screen.getByText("Fun Times")).toBeInTheDocument()
  })

  it("renders movies for action-fix mood", async () => {
    const mockMovies = [
      { id: 1, title: "Action Movie" },
      { id: 2, title: "Explosion Time" },
    ]
    
    // @ts-ignore - mocking implementation
    getMoviesByMood.mockResolvedValue(mockMovies)
    
    render(await MovieGrid({ mood: "action-fix" }))
    
    expect(getMoviesByMood).toHaveBeenCalledWith("action-fix")
    expect(screen.getByText("Action Movies")).toBeInTheDocument()
  })

  it("renders movies for mind-benders mood", async () => {
    const mockMovies = [
      { id: 1, title: "Inception" },
      { id: 2, title: "Memento" },
    ]
    
    // @ts-ignore - mocking implementation
    getMoviesByMood.mockResolvedValue(mockMovies)
    
    render(await MovieGrid({ mood: "mind-benders" }))
    
    expect(getMoviesByMood).toHaveBeenCalledWith("mind-benders")
    expect(screen.getByText("Mind Bending Movies")).toBeInTheDocument()
  })

  it("shows message when no movies are found", async () => {
    // @ts-ignore - mocking implementation
    getMoviesByMood.mockResolvedValue([])
    
    render(await MovieGrid({ mood: "feel-good" }))
    
    expect(screen.getByText("No movies found for this mood. Try another one!")).toBeInTheDocument()
  })

  it("shows error message when API call fails", async () => {
    // @ts-ignore - mocking implementation
    getMoviesByMood.mockRejectedValue(new Error("API Error"))
    
    render(await MovieGrid({ mood: "feel-good" }))
    
    expect(screen.getByText("Error")).toBeInTheDocument()
    expect(screen.getByText("There was a problem loading movies. Please try again later.")).toBeInTheDocument()
  })
})