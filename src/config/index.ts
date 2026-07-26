export const config = {
  app: {
    name: "WorkTag",
    tagline: "Built on Trust. Proven by Work.",
    url: process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000",
  },
  auth: {
    sessionExpiry: 60 * 60 * 24 * 7,
    sessionUpdateAge: 60 * 60 * 24,
    resetTokenExpiry: 60 * 60 * 2,
  },
  pagination: {
    defaultLimit: 20,
    maxLimit: 100,
  },
  upload: {
    maxFileSize: 10 * 1024 * 1024,
    allowedImageTypes: ["image/jpeg", "image/png", "image/webp"],
  },
} as const;
