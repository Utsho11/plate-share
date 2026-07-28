import { Card, CardContent, CardHeader } from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function RecipeDetailsSkeleton() {
  return (
    <div className="max-w-4xl mx-auto p-4 space-y-6 animate-pulse">
      {/* Title + Description */}
      <div className="space-y-3">
        <Skeleton className="h-9 w-3/5" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6" />

        <div className="flex gap-2 mt-3">
          <Skeleton className="h-6 w-24 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>
      </div>

      {/* Image */}
      <Skeleton className="w-full h-72 md:h-96 rounded-xl" />

      {/* Meta */}
      <Card className="rounded-xl">
        <CardContent className="p-4 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-24" />
          </div>

          <div className="flex items-center gap-2">
            <Skeleton className="w-4 h-4 rounded-full" />
            <Skeleton className="h-4 w-40" />
          </div>
        </CardContent>
      </Card>

      {/* Ingredients */}
      <Card className="rounded-xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-28" />
        </CardHeader>

        <CardContent className="space-y-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="flex justify-between items-center rounded-lg bg-muted/40 p-3"
            >
              <Skeleton className="h-5 w-36" />
              <Skeleton className="h-5 w-20" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Instructions */}
      <Card className="rounded-xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-40" />
          <Skeleton className="h-4 w-32" />
        </CardHeader>

        <CardContent className="space-y-4">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="rounded-lg bg-muted/30 p-4 space-y-2">
              <Skeleton className="h-5 w-20" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-11/12" />
              <Skeleton className="h-4 w-4/5" />
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Created & Updated */}
      <div className="flex flex-col items-center gap-2 py-2">
        <Skeleton className="h-3 w-48" />
        <Skeleton className="h-3 w-48" />
      </div>

      {/* Comment Form */}
      <Card className="rounded-xl">
        <CardHeader className="space-y-2">
          <Skeleton className="h-6 w-36" />
          <Skeleton className="h-10 w-full rounded-md" />
        </CardHeader>

        <CardContent className="space-y-3">
          <Skeleton className="h-24 w-full rounded-md" />
          <Skeleton className="h-10 w-28 rounded-md" />
        </CardContent>
      </Card>

      {/* Comments */}
      <div className="space-y-4">
        {Array.from({ length: 3 }).map((_, index) => (
          <Card key={index} className="rounded-xl">
            <CardContent className="p-4 flex gap-3">
              <Skeleton className="w-12 h-12 rounded-full shrink-0" />

              <div className="flex-1 space-y-2">
                <Skeleton className="h-4 w-36" />
                <Skeleton className="h-4 w-full" />
                <Skeleton className="h-4 w-5/6" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}