import { getMoviesByMood } from "@/lib/tmdb"
import MovieCard from "@/components/movie-card"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

interface MovieGridProps {
  mood: string
}

export default async function MovieGrid({ mood }: MovieGridProps) {
  try {
    const movies = await getMoviesByMood(mood)

    if (!movies.length) {
      return (
        <div className="text-center text-muted-foreground">
          <p>No movies found for this mood. Try another one!</p>
        </div>
      )
    }

    return (
      <div>
        <h2 className="text-2xl font-bold mb-6">
          {mood === "feel-good" && "Feel Good Movies"}
          {mood === "action-fix" && "Action Movies"}
          {mood === "mind-benders" && "Mind Bending Movies"}
        </h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {movies.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      </div>
    )
  } catch (error) {
    console.error("Error in MovieGrid:", error)
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>There was a problem loading movies. Please try again later.</AlertDescription>
      </Alert>
    )
  }
}
