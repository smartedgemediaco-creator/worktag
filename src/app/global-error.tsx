"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html>
      <body>
        <div className="flex min-h-screen flex-col items-center justify-center text-center">
          <h1 className="text-4xl font-bold text-gray-200">Error</h1>
          <h2 className="mt-4 text-xl font-semibold">Critical error</h2>
          <p className="mt-2 text-sm text-gray-500">
            {error.message ?? "A critical error occurred"}
          </p>
          <button
            onClick={reset}
            className="mt-6 rounded-lg bg-[#0A3D91] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0A3D91]/90"
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
