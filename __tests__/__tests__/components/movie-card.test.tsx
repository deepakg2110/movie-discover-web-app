import { render, screen, fireEvent } from "@testing-library/react"
import MovieCard from "@/components/movie-card"
import { useRouter } from "next/navigation"

// Mock Next.js components and hooks
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, fill, className }: any) => (
    <img src={src || "/placeholder.svg"} alt={alt} className={className} data-testid="movie-poster" />
  ),
}))

describe("MovieCard Component", () => {
  const mockRouter = { push: jest.fn() }
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  const mockMovie = {
    id: 123,
    title: "Test Movie",
    poster_path: "/test-poster.jpg",
    backdrop_path: "/test-backdrop.jpg",
    release_date: "2023-01-01",
    vote_average: 8.5,
    overview: "Test overview",
    genre_ids: [28, 12],
  }

  it("renders movie card with correct information", () => {
    render(<MovieCard movie={mockMovie} />)
    
    expect(screen.getByText("Test Movie")).toBeInTheDocument()
    expect(screen.getByText("2023")).toBeInTheDocument()
    expect(screen.getByText("8.5")).toBeInTheDocument()
    expect(screen.getByTestId("movie-poster")).toHaveAttribute(
      "src",
      "https://image.tmdb.org/t/p/w500/test-poster.jpg"
    )
  })

  it("shows loading state when clicked", () => {
    render(<MovieCard movie={mockMovie} />)
    
    const link = screen.getByRole("link")
    fireEvent.click(link)
    
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("handles movies without poster images", () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null }
    render(<MovieCard movie={movieWithoutPoster} />)
    
    expect(screen.getByText("No poster available")).toBeInTheDocument()
  })

  it("handles movies without release date", () => {
    const movieWithoutDate = { ...mockMovie, release_date: "" }
    render(<MovieCard movie={movieWithoutDate} />)
    
    expect(screen.getByText("N/A")).toBeInTheDocument()
  })

  it("shows hover state with play button", () => {
    render(<MovieCard movie={mockMovie} />)
    
    const card = screen.getByRole("link")
    fireEvent.mouseEnter(card)
    
    expect(screen.getByText("View Details")).toBeInTheDocument()
  })
})
