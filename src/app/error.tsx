"use client";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-4xl font-bold text-gray-200">Error</h1>
      <h2 className="mt-4 text-xl font-semibold">Something went wrong</h2>
      <p className="mt-2 text-sm text-gray-500">
        {error.message ?? "An unexpected error occurred"}
      </p>
      <button
        onClick={reset}
        className="mt-6 rounded-lg bg-[#0A3D91] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0A3D91]/90"
      >
        Try again
      </button>
    </div>
  );
}
