import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Lakshay Rewani | DevOps Engineer & Cloud Architect",
  description: "Portfolio of Lakshay Rewani, an aspiring DevOps Engineer and AI & Data Science student. Specializing in Kubernetes, AWS Cloud, OpenShift, Jenkins CI/CD pipelines, and infrastructure automation.",
  icons: {
    icon: "data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2280%22 font-family=%22monospace%22 font-weight=%22bold%22 fill=%22%23818cf8%22>&gt;_</text></svg>",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} antialiased dark`}>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
