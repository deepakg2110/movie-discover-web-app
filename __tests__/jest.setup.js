// Learn more: https://github.com/testing-library/jest-dom
import "@testing-library/jest-dom"

// Mock IntersectionObserver
class MockIntersectionObserver {
  constructor(callback) {
    this.callback = callback
    this.elements = new Set()
    this.observe = jest.fn((element) => {
      this.elements.add(element)
      this.callback([{ isIntersecting: true, target: element }])
    })
    this.unobserve = jest.fn((element) => {
      this.elements.delete(element)
    })
    this.disconnect = jest.fn()
  }
}

window.IntersectionObserver = MockIntersectionObserver

// Mock matchMedia
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock ResizeObserver
class MockResizeObserver {
  constructor(callback) {
    this.callback = callback
    this.observe = jest.fn()
    this.unobserve = jest.fn()
    this.disconnect = jest.fn()
  }
}

window.ResizeObserver = MockResizeObserver
