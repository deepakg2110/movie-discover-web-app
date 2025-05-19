import { render, screen } from "@testing-library/react"
import SearchPage from "@/app/search/page"

// Mock the components used in the page
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))

jest.mock("@/components/search-results", () => ({
  __esModule: true,
  default: ({ query }: any) => <div data-testid="search-results">Search Results: {query}</div>,
}))

describe("Search Page", () => {
  it("renders the search page with back button", () => {
    render(<SearchPage searchParams={{}} />)

    expect(screen.getByText("Search Results")).toBeInTheDocument()

    const backButton = screen.getByRole("link")
    expect(backButton).toHaveAttribute("href", "/")
  })

  it("renders search form with default value", () => {
    render(<SearchPage searchParams={{ query: "test query" }} />)

    const searchInput = screen.getByRole("searchbox")
    expect(searchInput).toHaveValue("test query")
  })

  it("renders search results when query is provided", () => {
    render(<SearchPage searchParams={{ query: "test query" }} />)

    expect(screen.getByTestId("search-results")).toBeInTheDocument()
    expect(screen.getByText("Search Results: test query")).toBeInTheDocument()
  })

  it("shows message when no query is provided", () => {
    render(<SearchPage searchParams={{}} />)

    expect(screen.getByText("Enter a search term to find movies or actors")).toBeInTheDocument()
    expect(screen.queryByTestId("search-results")).not.toBeInTheDocument()
  })
})
