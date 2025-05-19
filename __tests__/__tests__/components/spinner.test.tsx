import { render, screen } from "@testing-library/react"
import { Spinner } from "@/components/ui/spinner"

describe("Spinner Component", () => {
  it("renders with default size", () => {
    render(<Spinner />)
    
    const spinner = screen.getByRole("status")
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass("h-6 w-6") // Default is medium
  })

  it("renders with small size", () => {
    render(<Spinner size="sm" />)
    
    const spinner = screen.getByRole("status")
    expect(spinner).toHaveClass("h-4 w-4")
  })

  it("renders with large size", () => {
    render(<Spinner size="lg" />)
    
    const spinner = screen.getByRole("status")
    expect(spinner).toHaveClass("h-8 w-8")
  })

  it("applies custom className", () => {
    render(<Spinner className="text-red-500" />)
    
    const spinner = screen.getByRole("status")
    expect(spinner).toHaveClass("text-red-500")
  })

  it("includes screen reader text", () => {
    render(<Spinner />)
    
    expect(screen.getByText("Loading...")).toBeInTheDocument()
    expect(screen.getByText("Loading...")).toHaveClass("sr-only")
  })
})
