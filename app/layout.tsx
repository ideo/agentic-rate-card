import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://agentic-rate-card-ideo-vanderlin.vercel.app"),
  title: "Agentic Rate Card",
  description:
    "A practical planning guide for estimating agentic AI workflows, model stacks, token usage, and infrastructure costs.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Agentic Rate Card",
    description: "A practical planning guide for estimating agentic AI workflows and costs.",
    type: "website",
    url: "https://agentic-rate-card-ideo-vanderlin.vercel.app/",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
