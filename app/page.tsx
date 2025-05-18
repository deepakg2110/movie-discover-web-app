import { Suspense } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import MoodSelector from "@/components/mood-selector"
import MovieGrid from "@/components/movie-grid"
import SearchResults from "@/components/search-results"
import Image from "next/image"

export default function Home({
  searchParams,
}: {
  searchParams: { mood?: string; query?: string }
}) {
  const { mood, query } = searchParams

  return (
    <main className="min-h-screen mt-8 relative overflow-hidden">
      <div className="absolute inset-0 -z-10 h-full">
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 to-black/20 z-10" />
        <Image
          src="https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80"
          alt="Cinema background"
          className="w-full h-full object-cover object-center"
          width={1920}
          height={1080}
          priority
          style={{ filter: "blur(8px)" }} // Blur effect for background
          quality={100} // High quality for better appearance
        />
      </div>

      <div className="container mx-auto px-4 py-12 relative z-10">

        {/* Hero section */}
       {!mood && <section className="text-center mb-12 max-w-3xl mx-auto">
          <h1 className="text-6xl font-bold mb-6 text-white">
            What Should I Watch Tonight?
          </h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            AI-powered recommendations based on your mood and preferences
          </p>
        </section>}

        <div className="max-w-2xl mx-auto mb-10">
          <form action="/search" className="relative group">
            <Input
              type="search"
              name="query"
              placeholder="Search for movies, TV shows, actors..."
              className="pr-14 bg-black/70 border-gray-700 text-white placeholder-gray-400 h-16 text-lg focus:ring-2 focus:ring-red-500 focus:border-transparent rounded-none"
              defaultValue={query}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-1 top-1 h-14 w-14 bg-red-600 hover:bg-red-700 rounded-none"
            >
              <Search className="h-6 w-6" />
              <span className="sr-only">Search</span>
            </Button>
          </form>
        </div>

        {!query && (
          <>
            {/* Mood selector with hover effects */}
            <div className="mb-16 text-center">
              {/* <h2 className="text-2xl font-bold mb-6 text-white">
                How are you feeling?
              </h2> */}
              <MoodSelector activeMood={mood} />
            </div>

            {/* Movie grid section */}
            <section className="mt-12">
              <Suspense
                fallback={
                  <div className="text-center py-12">
                    <div className="inline-block h-10 w-10 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
                  </div>
                }
              >
                {mood ? (
                  <>
                    <h2 className="text-3xl font-bold mb-8 text-white text-center">
                      Recommended for {mood} mood
                    </h2>
                    <MovieGrid mood={mood} />
                  </>
                ) : (
                  <div className="text-center text-gray-400 py-12 bg-black/50 p-8 rounded-lg">
                    <p className="text-xl mb-4">Select your mood to begin</p>
                    <div className="flex justify-center space-x-2">
                      {[...Array(5)].map((_, i) => (
                        <div
                          key={i}
                          className="w-3 h-3 bg-red-600 rounded-full animate-pulse"
                          style={{ animationDelay: `${i * 0.1}s` }}
                        />
                      ))}
                    </div>
                  </div>
                )}
              </Suspense>
            </section>
          </>
        )}

        {query && (
          <Suspense
            fallback={
              <div className="text-center py-12 bg-black/50 p-8 rounded-lg">
                <p className="text-xl text-white mb-4">
                  Searching for "{query}"
                </p>
                <div className="inline-block h-8 w-8 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            }
          >
            <SearchResults query={query} />
          </Suspense>
        )}
      </div>

      <footer className="bg-black/80 py-8 mt-16 relative z-10">
        <div className="container mx-auto px-4 text-gray-400">
          <div className="flex flex-wrap justify-between">
            <div className="w-full md:w-auto mb-6 md:mb-0">
              <h3 className="text-xl font-bold text-white mb-4">MOVFLIX</h3>
              <p>© 2025 Movie Recommendations</p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
              <div>
                <h4 className="text-white mb-4">Navigation</h4>
                <ul className="space-y-2">
                  <li>Home</li>
                  <li>TV Shows</li>
                  <li>Movies</li>
                  <li>New & Popular</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white mb-4">Legal</h4>
                <ul className="space-y-2">
                  <li>Privacy Policy</li>
                  <li>Terms of Service</li>
                  <li>Cookie Preferences</li>
                </ul>
              </div>
              <div>
                <h4 className="text-white mb-4">Contact</h4>
                <ul className="space-y-2">
                  <li>Help Center</li>
                  <li>Jobs</li>
                  <li>Media Center</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}







