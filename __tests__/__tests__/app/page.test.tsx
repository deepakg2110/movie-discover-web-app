import { render, screen } from "@testing-library/react"
import Home from "@/app/page"
import { jest } from "@jest/globals"

// Mock the components used in the page
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt }: any) => <img src={src || "/placeholder.svg"} alt={alt} data-testid="hero-image" />,
}))

jest.mock("@/components/mood-selector", () => ({
  __esModule: true,
  default: ({ activeMood }: any) => <div data-testid="mood-selector">Mood Selector: {activeMood || "none"}</div>,
}))

jest.mock("@/components/movie-grid", () => ({
  __esModule: true,
  default: ({ mood }: any) => <div data-testid="movie-grid">Movie Grid: {mood}</div>,
}))

jest.mock("@/components/search-results", () => ({
  __esModule: true,
  default: ({ query }: any) => <div data-testid="search-results">Search Results: {query}</div>,
}))

jest.mock("@/components/featured-movie", () => ({
  __esModule: true,
  default: () => <div data-testid="featured-movie">Featured Movie</div>,
}))

describe("Home Page", () => {
  it("renders the home page with hero section", () => {
    render(<Home searchParams={{}} />)

    expect(screen.getByText("What Should I Watch Tonight?")).toBeInTheDocument()
    expect(screen.getByTestId("hero-image")).toBeInTheDocument()
    expect(screen.getByTestId("mood-selector")).toBeInTheDocument()
    expect(screen.getByTestId("featured-movie")).toBeInTheDocument()
  })

  it("renders movie grid when mood is selected", () => {
    render(<Home searchParams={{ mood: "feel-good" }} />)

    expect(screen.getByTestId("movie-grid")).toBeInTheDocument()
    expect(screen.getByText("Movie Grid: feel-good")).toBeInTheDocument()
    expect(screen.queryByTestId("featured-movie")).not.toBeInTheDocument()
  })

  it("renders search results when query is provided", () => {
    render(<Home searchParams={{ query: "test" }} />)

    expect(screen.getByTestId("search-results")).toBeInTheDocument()
    expect(screen.getByText("Search Results: test")).toBeInTheDocument()
    expect(screen.queryByTestId("mood-selector")).toBeInTheDocument()
    expect(screen.queryByTestId("featured-movie")).not.toBeInTheDocument()
  })

  it("prioritizes search query over mood selection", () => {
    render(<Home searchParams={{ query: "test", mood: "feel-good" }} />)

    expect(screen.getByTestId("search-results")).toBeInTheDocument()
    expect(screen.queryByTestId("movie-grid")).not.toBeInTheDocument()
  })
})
