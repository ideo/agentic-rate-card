import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://agentic-rate-card-ideo-vanderlin.vercel.app/", lastModified: new Date() }];
}
