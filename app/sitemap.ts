import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: [string, number][] = [["", 1], ["/cruises", 0.9], ["/book", 0.9], ["/experience", 0.7], ["/about", 0.6], ["/contact", 0.6]];
  return routes.map(([path, priority]) => ({ url: `${site.url}${path}`, lastModified: new Date(), changeFrequency: "monthly", priority }));
}
