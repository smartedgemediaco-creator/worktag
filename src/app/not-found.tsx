import Link from "next/link";
import { ROUTES } from "@/constants";

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center text-center">
      <h1 className="text-6xl font-bold text-gray-200">404</h1>
      <h2 className="mt-4 text-xl font-semibold">Page not found</h2>
      <p className="mt-2 text-sm text-gray-500">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href={ROUTES.home}
        className="mt-6 rounded-lg bg-[#0241A8] px-4 py-2 text-sm font-semibold text-white transition hover:bg-[#0241A8]/90"
      >
        Go home
      </Link>
    </div>
  );
}
