import { searchMovies, searchPeople } from "@/lib/tmdb"
import MovieCard from "@/components/movie-card"
import { Card, CardContent } from "@/components/ui/card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"
import Image from "next/image"

interface SearchResultsProps {
  query: string
}

export default async function SearchResults({ query }: SearchResultsProps) {
  try {
    const [movies, people] = await Promise.all([
      searchMovies(query).catch((err) => {
        console.error("Error searching movies:", err)
        return []
      }),
      searchPeople(query).catch((err) => {
        console.error("Error searching people:", err)
        return []
      }),
    ])

    if (!movies.length && !people.length) {
      return (
        <div className="text-center text-muted-foreground">
          <p>No results found for &quot;{query}&quot;. Try a different search term.</p>

        </div>
      )
    }

    return (
      <div className="space-y-12">
        {movies.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Movies</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
              {movies.map((movie) => (
                <MovieCard key={movie.id} movie={movie} />
              ))}
            </div>
          </section>
        )}

        {people.length > 0 && (
          <section>
            <h2 className="text-2xl font-bold mb-6">Actors</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {people.map((person) => (
                <Card key={person.id} className="overflow-hidden h-full">
                  <div className="relative aspect-[2/3]">
                    {person.profile_path ? (
                      <Image
                        src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
                        alt={person.name}
                        fill
                        className="object-cover"
                        sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 16vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-muted flex items-center justify-center">
                        <p className="text-xs text-muted-foreground text-center p-2">No image</p>
                      </div>
                    )}
                  </div>
                  <CardContent className="p-3">
                    <h3 className="font-medium line-clamp-1">{person.name}</h3>
                    {person.known_for && person.known_for.length > 0 && (
                      <p className="text-sm text-muted-foreground line-clamp-1">
                        Known for: {person.known_for.map((item) => item.title || item.name).join(", ")}
                      </p>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </section>
        )}
      </div>
    )
  } catch (error) {
    console.error("Error in SearchResults:", error)
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>There was a problem searching for &quot;{query}&quot;. Please try again later.</AlertDescription>

      </Alert>
    )
  }
}
