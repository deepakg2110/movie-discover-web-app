"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Film, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
// import { ThemeToggle } from "@/components/ui/theme-toggle"

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 mb-4 mt-2 ${
        isScrolled || isMobileMenuOpen ? "bg-background/95 backdrop-blur-md shadow-md" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 text-white">
            <Film className="h-10 w-10" />
                      <h1 className="text-5xl font-bold text-red-600 font-mono tracking-tight">
            MOVFLIX
          </h1>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              href="/"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" ? "text-primary" : "text-white/80"
              }`}
            >
              Home
            </Link>
            <Link
              href="/?mood=feel-good"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" && pathname.includes("mood=feel-good") ? "text-primary" : "text-white/80"
              }`}
            >


              Feel Good
            </Link>
            <Link
              href="/?mood=action-fix"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" && pathname.includes("mood=action-fix") ? "text-primary" : "text-white/80"
              }`}
            >
              Action Fix
            </Link>
            <Link
              href="/?mood=mind-benders"
              className={`text-sm font-medium transition-colors hover:text-primary ${
                pathname === "/" && pathname.includes("mood=mind-benders") ? "text-primary" : "text-white/80"
              }`}
            >
              Mind Benders
            </Link>
          </nav>

          {/* Right Side Actions */}
          <div className="flex items-center gap-2">
            {/* <Link href="/search"> */}
            
                          <Button variant="ghost" className="text-white hover:bg-white/10 cursor-pointer">
              Sign In
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white cursor-pointer">
              Join Now
            </Button>
            {/* </Link> */}
            {/* <ThemeToggle /> */}

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              <span className="sr-only">Menu</span>
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-4 px-2 space-y-4">
            <Link
              href="/"
              className={`block py-2 text-sm font-medium ${pathname === "/" ? "text-primary" : "text-white/80"}`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/?mood=feel-good"
              className={`block py-2 text-sm font-medium ${
                pathname === "/" && pathname.includes("mood=feel-good") ? "text-primary" : "text-white/80"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Feel Good
            </Link>
            <Link
              href="/?mood=action-fix"
              className={`block py-2 text-sm font-medium ${
                pathname === "/" && pathname.includes("mood=action-fix") ? "text-primary" : "text-white/80"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Action
            </Link>
            <Link
              href="/?mood=mind-benders"
              className={`block py-2 text-sm font-medium ${
                pathname === "/" && pathname.includes("mood=mind-benders") ? "text-primary" : "text-white/80"
              }`}
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Mind Benders
            </Link>
          </div>
        )}
      </div>
    </header>
  )
}
