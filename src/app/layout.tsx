import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "WorkTag — Built on Trust. Proven by Work.",
  description:
    "WorkTag is a trust platform that enables businesses and professionals to establish verified digital identities through QR technology.",
  openGraph: {
    title: "WorkTag — Built on Trust. Proven by Work.",
    description:
      "Create a trusted digital identity for your business. One QR code. One profile. Infinite trust.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col">
        {children}
        <div className="grain" aria-hidden="true" />
        <Toaster richColors closeButton />
      </body>
    </html>
  );
}
