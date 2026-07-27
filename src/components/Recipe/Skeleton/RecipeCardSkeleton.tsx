import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/src/components/ui/card";
import { Skeleton } from "@/src/components/ui/skeleton";

export default function RecipeCardSkeleton() {
  return (
    <Card className="w-full max-w-xl mx-auto rounded-xl border shadow-sm my-4 animate-pulse">
      {/* Header */}
      <CardHeader className="flex flex-row items-center justify-between p-4">
        <div className="flex items-center gap-3">
          <Skeleton className="h-10 w-10 rounded-full" />

          <div className="space-y-2">
            <Skeleton className="h-4 w-36" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        <Skeleton className="h-5 w-5 rounded" />
      </CardHeader>

      {/* Content */}
      <CardContent className="p-4 pt-0 space-y-3">
        <Skeleton className="h-6 w-3/4" />

        <div className="space-y-2">
          <Skeleton className="h-4 w-full" />
          <Skeleton className="h-4 w-11/12" />
        </div>

        <Skeleton className="h-4 w-20" />

        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-24" />
          <Skeleton className="h-4 w-1 rounded-full" />
          <Skeleton className="h-4 w-20" />
        </div>
      </CardContent>

      {/* Image */}
      <Skeleton className="w-full h-64 rounded-none" />

      {/* Footer */}
      <CardFooter className="flex items-center justify-between px-4 py-3 border-t mt-2">
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
        <Skeleton className="h-10 w-28 rounded-md" />
        <Skeleton className="h-10 w-24 rounded-md" />
      </CardFooter>
    </Card>
  );
}
