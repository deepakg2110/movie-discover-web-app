import type React from "react"
import { render, screen } from "@testing-library/react"
import MoodSelector from "@/components/mood-selector"

// Mock Next.js components
jest.mock("next/link", () => ({
  __esModule: true,
  default: ({ href, children }: { href: string; children: React.ReactNode }) => <a href={href}>{children}</a>,
}))

describe("MoodSelector", () => {
  it("renders all mood options", () => {
    render(<MoodSelector />)

    // Check if all mood buttons are rendered
    expect(screen.getByText("Feel Good")).toBeInTheDocument()
    expect(screen.getByText("Action Fix")).toBeInTheDocument()
    expect(screen.getByText("Mind Benders")).toBeInTheDocument()

    // Check if descriptions are rendered
    expect(screen.getByText("Uplifting and heartwarming movies")).toBeInTheDocument()
    expect(screen.getByText("Thrilling and exciting adventures")).toBeInTheDocument()
    expect(screen.getByText("Thought-provoking and complex stories")).toBeInTheDocument()
  })

  it("highlights the active mood", () => {
    render(<MoodSelector activeMood="feel-good" />)

    // Get all buttons
    const buttons = screen.getAllByRole("link")

    // Check if the correct links are generated
    expect(buttons[0]).toHaveAttribute("href", "/?mood=feel-good")
    expect(buttons[1]).toHaveAttribute("href", "/?mood=action-fix")
    expect(buttons[2]).toHaveAttribute("href", "/?mood=mind-benders")
  })
})
