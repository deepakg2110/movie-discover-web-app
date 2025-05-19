import { render, screen, fireEvent, act } from "@testing-library/react"
import Navbar from "@/components/navbar"
import { usePathname } from "next/navigation"

// Mock Next.js hooks and components
jest.mock("next/navigation", () => ({
  usePathname: jest.fn(),
}))

jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: any) => <a href={href}>{children}</a>,
}))

jest.mock("@/components/ui/theme-toggle", () => ({
  ThemeToggle: () => <div data-testid="theme-toggle">Theme Toggle</div>,
}))

describe("Navbar Component", () => {
  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue("/")
    
    // Mock window scroll events
    Object.defineProperty(window, "scrollY", {
      value: 0,
      writable: true,
    })
    
    // Mock addEventListener and removeEventListener
    window.addEventListener = jest.fn()
    window.removeEventListener = jest.fn()
  })

  it("renders navbar with logo and navigation links", () => {
    render(<Navbar />)
    
    expect(screen.getByText("MovieNight")).toBeInTheDocument()
    expect(screen.getByText("Home")).toBeInTheDocument()
    expect(screen.getByText("Feel Good")).toBeInTheDocument()
    expect(screen.getByText("Action")).toBeInTheDocument()
    expect(screen.getByText("Mind Benders")).toBeInTheDocument()
    expect(screen.getByTestId("theme-toggle")).toBeInTheDocument()
  })

  it("highlights the active navigation link", () => {
    (usePathname as jest.Mock).mockReturnValue("/")
    
    render(<Navbar />)
    
    const homeLink = screen.getByText("Home")
    expect(homeLink).toHaveClass("text-primary")
    
    const actionLink = screen.getByText("Action")
    expect(actionLink).not.toHaveClass("text-primary")
  })

  it("changes background on scroll", () => {
    render(<Navbar />)
    
    // Initially transparent
    const header = screen.getByRole("banner")
    expect(header).toHaveClass("bg-transparent")
    
    // Simulate scroll
    act(() => {
      Object.defineProperty(window, "scrollY", { value: 20 })
      // Trigger the scroll event listener that was registered
      const scrollCallback = (window.addEventListener as jest.Mock).mock.calls.find(
        call => call[0] === "scroll"
      )[1]
      scrollCallback()
    })
    
    // Should now have background
    expect(header).toHaveClass("bg-background/95")
  })

  it("toggles mobile menu when menu button is clicked", () => {
    render(<Navbar />)
    
    // Mobile menu should be hidden initially
    expect(screen.queryByRole("link", { name: "Home" })).toBeInTheDocument()
    expect(screen.queryByRole("link", { name: "Feel Good" })).toBeInTheDocument()
    
    // Click menu button to open mobile menu
    const menuButton = screen.getByRole("button", { name: "Menu" })
    fireEvent.click(menuButton)
    
    // Close button should now be visible
    expect(screen.getByRole("button", { name: "Menu" })).toBeInTheDocument()
    
    // Click again to close
    fireEvent.click(menuButton)
    
    // Mobile menu should be hidden again
    expect(screen.queryByRole("button", { name: "Menu" })).toBeInTheDocument()
  })

  it("cleans up event listeners on unmount", () => {
    const { unmount } = render(<Navbar />)
    
    unmount()
    
    expect(window.removeEventListener).toHaveBeenCalledWith("scroll", expect.any(Function))
  })
})
