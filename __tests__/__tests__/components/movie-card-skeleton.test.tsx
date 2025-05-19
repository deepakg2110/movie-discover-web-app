import { render, screen } from "@testing-library/react"
import MovieCardSkeleton from "@/components/movie-card-skeleton"

describe("MovieCardSkeleton Component", () => {
  it("renders skeleton elements", () => {
    render(<MovieCardSkeleton />)
    
    // Check for the card container
    const card = screen.getByRole("article")
    expect(card).toBeInTheDocument()
    expect(card).toHaveClass("overflow-hidden")
    
    // Check for skeleton elements
    const skeletons = screen.getAllByTestId("skeleton")
    expect(skeletons.length).toBeGreaterThanOrEqual(3) // At least poster, title, and metadata skeletons
    
    // Check for aspect ratio skeleton for poster
    const posterSkeleton = skeletons[0]
    expect(posterSkeleton).toHaveClass("aspect-[2/3]")
  })
})
