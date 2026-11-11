export default function ArticleLoading() {
  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-pulse py-6">
      {/* Category & Time */}
      <div className="h-4 w-32 bg-stone-200" />

      {/* Title */}
      <div className="space-y-3">
        <div className="h-10 w-full bg-stone-300" />
        <div className="h-10 w-4/5 bg-stone-300" />
      </div>

      {/* Subtitle */}
      <div className="h-6 w-2/3 bg-stone-200" />

      {/* Author & Meta Line */}
      <div className="border-t border-b border-stone-200 py-3 flex items-center justify-between">
        <div className="h-4 w-48 bg-stone-200" />
        <div className="h-4 w-28 bg-stone-200" />
      </div>

      {/* Image Skeleton */}
      <div className="aspect-[16/10] w-full bg-stone-300" />

      {/* Body Skeleton */}
      <div className="space-y-4 pt-4">
        <div className="h-4 w-full bg-stone-200" />
        <div className="h-4 w-full bg-stone-200" />
        <div className="h-4 w-5/6 bg-stone-200" />
        <div className="h-4 w-4/5 bg-stone-200" />
      </div>
    </div>
  );
}
