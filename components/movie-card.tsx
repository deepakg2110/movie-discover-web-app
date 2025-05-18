'use client';
//               Feel Good'
import Link from "next/link"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import type { Movie } from "@/lib/types"
import { Spinner } from "@/components/ui/spinner"
import { useState } from "react"

interface MovieCardProps {
  movie: Movie
}

export default function MovieCard({ movie }: MovieCardProps) {
    const [loading, setLoading] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
  return (
    <Link href={`/movie/${movie.id}`}  onClick={() => setLoading(true)}
      className="relative block"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      <Card className={`overflow-hidden border-0 rounded-lg shadow-lg transition-all duration-300 ${
          isHovered ? "transform scale-105 shadow-xl z-10" : ""
        }`}>
        <div className="relative aspect-[2/3]">
          {movie.poster_path ? (
            <Image
              src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
              alt={movie.title}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
          ) : (
            <div className="w-full h-full bg-muted flex items-center justify-center">
              <p className="text-xs text-muted-foreground text-center p-2">No poster available</p>
            </div>
          )}
        </div>
        
        <CardContent className="p-3">
          <h3 className="font-medium line-clamp-1">{movie.title}</h3>
          <div className="flex items-center justify-between mt-1">
            <span className="text-sm text-muted-foreground">
              {movie.release_date ? new Date(movie.release_date).getFullYear() : "N/A"}
            </span>
            {movie.vote_average > 0 && (
              <div className="flex items-center text-sm">
                <Star className="h-3 w-3 fill-yellow-400 mr-1" />
                <span>{movie.vote_average.toFixed(1)}</span>
              </div>
            )}
          </div>
        </CardContent>
            {loading && (
              <div className="absolute inset-0 flex items-center justify-center bg-background/80 rounded-lg z-20">
          <Spinner size="lg" />
        </div>
      )}
      </Card>
    </Link>
  )
}
