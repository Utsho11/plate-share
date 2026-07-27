// app/loading.tsx

export default function Loading() {
  return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4">
        {/* Simple spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-muted border-t-primary" />
        <p className="text-sm text-muted-foreground">Loading Plateshare...</p>
      </div>
    </div>
  )
}