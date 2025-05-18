import type React from "react"
import { render, screen } from "@testing-library/react"
import MovieCard from "@/components/movie-card"

// Mock Next.js components
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: { src: string; alt: string }) => <img src={src || "/placeholder.svg"} alt={alt} />,
}))

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}))

describe("MovieCard", () => {
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

  it("renders movie information correctly", () => {
    render(<MovieCard movie={mockMovie} />)

    // Check if title is rendered
    expect(screen.getByText("Test Movie")).toBeInTheDocument()

    // Check if year is rendered
    expect(screen.getByText("2023")).toBeInTheDocument()

    // Check if rating is rendered
    expect(screen.getByText("8.5")).toBeInTheDocument()

    // Check if link points to correct movie page
    const link = screen.getByRole("link")
    expect(link).toHaveAttribute("href", "/movie/123")
  })

  it("handles missing poster path", () => {
    const movieWithoutPoster = {
      ...mockMovie,
      poster_path: null,
    }

    render(<MovieCard movie={movieWithoutPoster} />)

    // Check if fallback text is shown
    expect(screen.getByText("No poster available")).toBeInTheDocument()
  })

  it("handles missing release date", () => {
    const movieWithoutDate = {
      ...mockMovie,
      release_date: "",
    }

    render(<MovieCard movie={movieWithoutDate} />)

    // Check if N/A is shown for missing date
    expect(screen.getByText("N/A")).toBeInTheDocument()
  })
})
