import { Suspense } from "react"
import Link from "next/link"
import Image from "next/image"
import { ArrowLeft, Calendar, Star, AlertCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { getMovieDetails, getSimilarMovies } from "@/lib/tmdb"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import MovieCard from "@/components/movie-card"
import MovieLoading from "./loading"

export default async function MoviePage({ params }: Awaited<{ params: any }>) {
  const movie = await getMovieDetails(params.id)

  return (
    <main className="container mx-auto px-4 py-20">
      <div className="mb-2">
        <Link href="/">
          <Button variant="ghost" size="sm" className="mb-4">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Home
          </Button>
        </Link>
      </div>

      <Suspense fallback={<MovieLoading />}>

        <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
          <div className="relative aspect-[2/3] overflow-hidden rounded-lg shadow-lg">
            {movie.poster_path ? (
              <Image
                src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                alt={movie.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 300px"
                priority
              />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <p className="text-muted-foreground">No poster available</p>
              </div>
            )}
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h1 className="text-3xl font-bold">{movie.title}</h1>
              {movie.release_date && (
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="mr-1 h-4 w-4" />
                  <span>{new Date(movie.release_date).getFullYear()}</span>
                </div>
              )}
              {movie.vote_average > 0 && (
                <Badge variant="secondary" className="flex items-center gap-1">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{movie.vote_average.toFixed(1)}</span>
                </Badge>
              )}
            </div>

            {movie.tagline && <p className="text-lg italic text-muted-foreground mb-4">{movie.tagline}</p>}

            <div className="mb-6">
              <h2 className="text-xl font-semibold mb-2">Overview</h2>
              <p className="text-muted-foreground">{movie.overview || "No overview available."}</p>
            </div>

            {movie.genres && movie.genres.length > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Genres</h2>
                <div className="flex flex-wrap gap-2">
                  {/* @ts-ignore */}
                  {movie.genres.map((genre) => (
                    <Badge key={genre.id} variant="outline">
                      {genre.name}
                    </Badge>
                  ))}
                </div>
              </div>
            )}

            {movie.runtime > 0 && (
              <div className="mb-6">
                <h2 className="text-xl font-semibold mb-2">Runtime</h2>
                <p className="text-muted-foreground">
                  {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}m
                </p>
              </div>
            )}
          </div>
        </div>

        {movie.videos && movie.videos.results && movie.videos.results.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Trailers & Videos</h2>
            <div className="grid gap-4 md:grid-cols-2">
              {/* @ts-ignore */}
              {movie.videos.results.slice(0, 2).map((video) => (
                <div key={video.id} className="aspect-video">
                  <iframe
                    width="100%"
                    height="100%"
                    src={`https://www.youtube.com/embed/${video.key}`}
                    title={video.name}
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>
              ))}
            </div>
          </section>
        )}

        {movie.credits && movie.credits.cast && movie.credits.cast.length > 0 && (
          <section className="mb-12">
            <h2 className="text-2xl font-bold mb-4">Cast</h2>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
              {/* @ts-ignore */}
              {movie.credits.cast.slice(0, 6).map((person) => (
                <Card key={person.id} className="overflow-hidden">
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
                  <div className="p-3">
                    <p className="font-medium line-clamp-1">{person.name}</p>
                    <p className="text-sm text-muted-foreground line-clamp-1">{person.character}</p>
                  </div>
                </Card>
              ))}
            </div>
          </section>
        )}
        {/* </Suspense> */}
        <section>
          <h2 className="text-2xl font-bold mb-4">Similar Movies</h2>
          {/* <Suspense fallback={<MovieLoading />}> */}
          <SimilarMovies movieId={params.id} />
        </section>
      </Suspense>
    </main>
  )
}

async function SimilarMovies({ movieId }: { movieId: string }) {
  try {
    const similarMovies = await getSimilarMovies(movieId)

    if (!similarMovies.length) {
      return <p className="text-muted-foreground">No similar movies found.</p>
    }

    return (
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {similarMovies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    )
  } catch (error) {
    console.error("Error in SimilarMovies:", error)
    return (
      <Alert variant="destructive" className="my-4">
        <AlertCircle className="h-4 w-4" />
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>There was a problem loading similar movies. Please try again later.</AlertDescription>
      </Alert>
    )
  }
}
