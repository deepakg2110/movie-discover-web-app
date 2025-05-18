import MovieCardSkeleton from "@/components/movie-card-skeleton"
import Skeleton from "@/components/ui/skeleton"

export default function Loading() {
  return (
    <div className="container mx-auto px-4 py-8">
      <section className="text-center mb-12">
        <Skeleton className="h-10 w-3/4 mx-auto mb-4" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
      </section>

      <div className="max-w-xl mx-auto mb-12">
        <Skeleton className="h-10 w-full" />
      </div>

      <section className="mb-12">
        <Skeleton className="h-8 w-1/3 mx-auto mb-4" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-3xl mx-auto">
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-24 w-full" />
        </div>
      </section>

      <section>
        <Skeleton className="h-8 w-1/4 mb-6" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(10)
            .fill(null)
            .map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
        </div>
      </section>
    </div>
  )
}
