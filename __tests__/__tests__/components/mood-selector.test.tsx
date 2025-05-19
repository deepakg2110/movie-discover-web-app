import { render, screen, fireEvent } from "@testing-library/react"
import MoodSelector from "@/components/mood-selector"
import { useRouter } from "next/navigation"

// Mock Next.js navigation
jest.mock("next/navigation", () => ({
  useRouter: jest.fn(),
}))

describe("MoodSelector Component", () => {
  const mockRouter = { push: jest.fn() }
  
  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter)
  })

  it("renders all mood options", () => {
    render(<MoodSelector />)
    
    expect(screen.getByText("Feel Good")).toBeInTheDocument()
    expect(screen.getByText("Action Fix")).toBeInTheDocument()
    expect(screen.getByText("Mind Benders")).toBeInTheDocument()
  })

  it("highlights the active mood", () => {
    render(<MoodSelector activeMood="feel-good" />)
    
    const buttons = screen.getAllByRole("button")
    
    // First button should have the primary style (active)
    expect(buttons[0]).toHaveClass("bg-primary")
    
    // Other buttons should not have primary style
    expect(buttons[1]).not.toHaveClass("bg-primary")
    expect(buttons[2]).not.toHaveClass("bg-primary")
  })

  it("navigates to correct URL when mood is selected", () => {
    render(<MoodSelector />)
    
    const actionButton = screen.getByText("Action Fix")
    fireEvent.click(actionButton)
    
    expect(mockRouter.push).toHaveBeenCalledWith("/?mood=action-fix")
  })

  it("shows loading state when a mood is selected", () => {
    render(<MoodSelector />)
    
    const actionButton = screen.getByText("Action Fix")
    fireEvent.click(actionButton)
    
    expect(screen.getByRole("status")).toBeInTheDocument()
  })

  it("doesn't navigate if the active mood is clicked again", () => {
    render(<MoodSelector activeMood="feel-good" />)
    
    const feelGoodButton = screen.getByText("Feel Good")
    fireEvent.click(feelGoodButton)
    
    expect(mockRouter.push).not.toHaveBeenCalled()
  })
})
