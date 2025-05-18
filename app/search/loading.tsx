import MovieCardSkeleton from "@/components/movie-card-skeleton"
import Skeleton  from "@/components/ui/skeleton"

export default function SearchLoading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex items-center mb-8">
        <Skeleton className="h-10 w-10 mr-2" />
        <Skeleton className="h-8 w-1/4" />
      </div>

      <div className="max-w-xl mx-auto mb-8">
        <Skeleton className="h-10 w-full" />
      </div>

      <div className="space-y-12">
        <section>
          <Skeleton className="h-8 w-1/4 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {Array(5)
              .fill(null)
              .map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))}
          </div>
        </section>

        <section>
          <Skeleton className="h-8 w-1/4 mb-6" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {Array(6)
              .fill(null)
              .map((_, index) => (
                <MovieCardSkeleton key={index} />
              ))}
          </div>
        </section>
      </div>
    </div>
  )
}
