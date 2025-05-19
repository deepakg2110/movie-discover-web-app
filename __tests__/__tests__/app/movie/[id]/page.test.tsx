import { render, screen } from "@testing-library/react"
import MoviePage from "@/app/movie/[id]/page"
import { getMovieDetails } from "@/lib/tmdb"

// Mock the API function and components
jest.mock("@/lib/tmdb", () => ({
  getMovieDetails: jest.fn(),
  getSimilarMovies: jest.fn(),
}))

jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src || "/placeholder.svg"} alt={alt} data-testid="movie-image" />,
}))

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))

// Mock the SimilarMovies component
jest.mock("@/app/movie/[id]/page", () => {
  const originalModule = jest.requireActual("@/app/movie/[id]/page")
  return {
    ...originalModule,
    SimilarMovies: ({ movieId }: any) => <div data-testid="similar-movies">Similar Movies for: {movieId}</div>,
  }
})

describe("Movie Details Page", () => {
  beforeEach(() => {
    jest.clearAllMocks()
  })

  it("renders movie details with all information", async () => {
    const mockMovie = {
      id: 123,
      title: "Test Movie",
      poster_path: "/poster.jpg",
      backdrop_path: "/backdrop.jpg",
      release_date: "2023-01-01",
      vote_average: 8.5,
      overview: "Test overview",
      tagline: "Test tagline",
      genres: [
        { id: 28, name: "Action" },
        { id: 12, name: "Adventure" },
      ],
      runtime: 120,
      videos: {
        results: [
          {
            id: "video1",
            key: "abc123",
            name: "Trailer",
            site: "YouTube",
            type: "Trailer",
          },
        ],
      },
      credits: {
        cast: [
          {
            id: 1,
            name: "Actor Name",
            character: "Character Name",
            profile_path: "/profile.jpg",
          },
        ],
      },
    }

    // @ts-ignore - mocking implementation
    getMovieDetails.mockResolvedValue(mockMovie)

    render(await MoviePage({ params: { id: "123" } }))

    // Check basic movie info
    expect(screen.getByText("Test Movie")).toBeInTheDocument()
    expect(screen.getByText("2023")).toBeInTheDocument()
    expect(screen.getByText("8.5")).toBeInTheDocument()
    expect(screen.getByText("Test overview")).toBeInTheDocument()
    expect(screen.getByText("Test tagline")).toBeInTheDocument()

    // Check genres
    expect(screen.getByText("Action")).toBeInTheDocument()
    expect(screen.getByText("Adventure")).toBeInTheDocument()

    // Check runtime
    expect(screen.getByText("2h 0m")).toBeInTheDocument()

    // Check cast
    expect(screen.getByText("Actor Name")).toBeInTheDocument()
    expect(screen.getByText("Character Name")).toBeInTheDocument()

    // Check for trailer section
    expect(screen.getByText("Trailers & Videos")).toBeInTheDocument()

    // Check for similar movies section
    expect(screen.getByText("Similar Movies")).toBeInTheDocument()
  })

  it("handles movie without optional data", async () => {
    const mockMovie = {
      id: 123,
      title: "Test Movie",
      poster_path: null,
      backdrop_path: null,
      release_date: "",
      vote_average: 0,
      overview: "",
      genres: [],
      runtime: 0,
    }

    // @ts-ignore - mocking implementation
    getMovieDetails.mockResolvedValue(mockMovie)

    render(await MoviePage({ params: { id: "123" } }))

    expect(screen.getByText("Test Movie")).toBeInTheDocument()
    expect(screen.getByText("No poster available")).toBeInTheDocument()
    expect(screen.getByText("No overview available.")).toBeInTheDocument()

    // These sections should not be present
    expect(screen.queryByText("Trailers & Videos")).not.toBeInTheDocument()
    expect(screen.queryByText("Cast")).not.toBeInTheDocument()
  })

  it("renders back button with correct link", async () => {
    // @ts-ignore - mocking implementation
    getMovieDetails.mockResolvedValue({
      id: 123,
      title: "Test Movie",
    })

    render(await MoviePage({ params: { id: "123" } }))

    const backButton = screen.getByText("Back to Home")
    expect(backButton).toBeInTheDocument()

    const link = backButton.closest("a")
    expect(link).toHaveAttribute("href", "/")
  })
})
