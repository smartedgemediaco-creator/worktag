import type { NextConfig } from "next";

type ImageRemotePattern = { protocol: "https"; hostname: string };

const DEFAULT_IMAGE_HOSTS: ImageRemotePattern[] = [
  { protocol: "https", hostname: "*.r2.cloudflarestorage.com" },
  { protocol: "https", hostname: "*.supabase.co" },
];

function imageRemotePatterns(): ImageRemotePattern[] {
  const hosts = (process.env.NEXT_PUBLIC_IMAGE_HOSTS ?? "")
    .split(",")
    .map((hostname) => hostname.trim())
    .filter(Boolean);

  if (hosts.length === 0) return DEFAULT_IMAGE_HOSTS;

  return hosts.map((hostname) => ({ protocol: "https", hostname }));
}

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: imageRemotePatterns(),
  },
  serverExternalPackages: ["@prisma/client"],
};

export default nextConfig;
