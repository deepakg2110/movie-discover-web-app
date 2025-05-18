import Skeleton from "@/components/ui/skeleton"
import MovieCardSkeleton from "@/components/movie-card-skeleton"

export default function MovieLoading() {
  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <Skeleton className="h-10 w-24" />
      </div>

      <div className="grid md:grid-cols-[300px_1fr] gap-8 mb-12">
        <Skeleton className="aspect-[2/3] w-full" />

        <div>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Skeleton className="h-10 w-3/4" />
            <Skeleton className="h-6 w-20" />
            <Skeleton className="h-6 w-16" />
          </div>

          <Skeleton className="h-6 w-1/2 mb-4" />

          <div className="mb-6">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-full mb-1" />
            <Skeleton className="h-4 w-3/4" />
          </div>

          <div className="mb-6">
            <Skeleton className="h-8 w-32 mb-2" />
            <div className="flex flex-wrap gap-2">
              <Skeleton className="h-6 w-20" />
              <Skeleton className="h-6 w-24" />
              <Skeleton className="h-6 w-16" />
            </div>
          </div>

          <div className="mb-6">
            <Skeleton className="h-8 w-32 mb-2" />
            <Skeleton className="h-6 w-24" />
          </div>
        </div>
      </div>

      <section className="mb-12">
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="aspect-video w-full" />
          <Skeleton className="aspect-video w-full" />
        </div>
      </section>

      <section className="mb-12">
        <Skeleton className="h-8 w-24 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
          {Array(6)
            .fill(null)
            .map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
        </div>
      </section>

      <section>
        <Skeleton className="h-8 w-48 mb-4" />
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {Array(5)
            .fill(null)
            .map((_, index) => (
              <MovieCardSkeleton key={index} />
            ))}
        </div>
      </section>
    </main>
  )
}
