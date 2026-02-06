export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] gap-4">
      {/* Animated Bars */}
      <div className="flex gap-2">
        <span className="w-3 h-10 bg-blue-500 rounded animate-loader delay-0" />
        <span className="w-3 h-14 bg-blue-400 rounded animate-loader delay-150" />
        <span className="w-3 h-10 bg-blue-500 rounded animate-loader delay-300" />
      </div>

      {/* Text */}
      <p className="text-sm text-muted-foreground tracking-wide">
        Loading tasks…
      </p>
    </div>
  );
}
