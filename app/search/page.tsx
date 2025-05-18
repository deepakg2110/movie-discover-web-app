import { Suspense } from "react"
import Link from "next/link"
import { ArrowLeft, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import SearchResults from "@/components/search-results"
import { Spinner } from "@/components/ui/spinner"
import MovieCardSkeleton from "@/components/movie-card-skeleton"

export default function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string }
}) {
  const { query } = searchParams

  return (
    <main className="container mx-auto px-4 py-20">
      <div className="flex items-center mb-8">
        <Link href="/">
          <Button variant="ghost" size="icon" className="mr-2">
            <ArrowLeft className="h-4 w-4" />
            <span className="sr-only">Back to home</span>
          </Button>
        </Link>
        <h1 className="text-2xl font-bold">Search Results</h1>
      </div>

      <div className="max-w-xl mx-auto mb-8">
        <form className="relative">
          <Input
            type="search"
            name="query"
            placeholder="Search for movies or actors..."
            className="pr-10"
            defaultValue={query}
          />
          <Button type="submit" size="icon" variant="ghost" className="absolute right-0 top-0 h-10 w-10">
            <Search className="h-4 w-4" />
            <span className="sr-only">Search</span>
          </Button>
        </form>
      </div>

      {query ? (
        <Suspense fallback={
          <div>
            <div className="flex justify-center mb-6">
              <Spinner size="lg" />
            </div>
            <div className="space-y-12">
              <section>
                <h2 className="text-2xl font-bold mb-6 text-white">Movies</h2>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
                  {Array(5)
                    .fill(null)
                    .map((_, index) => (
                      <MovieCardSkeleton key={index} />
                    ))}
                </div>
              </section>
            </div>
          </div>
        }>
          <SearchResults query={query} />
        </Suspense>
      ) : (
        <div className="text-center text-muted-foreground">
          <p>Enter a search term to find movies or actors</p>
        </div>
      )}
    </main>
  )
}
