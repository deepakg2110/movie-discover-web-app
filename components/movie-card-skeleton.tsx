import { Card } from "@/components/ui/card"
import Skeleton  from "@/components/ui/skeleton"

export default function MovieCardSkeleton() {
  return (
    <Card className="overflow-hidden h-full border-0 bg-card/30 backdrop-blur-sm shadow-lg">
      <Skeleton className="aspect-[2/3] w-full" />
      <div className="p-4">
        <Skeleton className="h-5 w-3/4 mb-2" />
        <div className="flex items-center justify-between">
          <Skeleton className="h-4 w-1/4" />
          <Skeleton className="h-4 w-1/4" />
        </div>
      </div>
    </Card>
  )
}
