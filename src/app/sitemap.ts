import type { MetadataRoute } from "next";

const siteUrl = "https://focuspilot.io";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes: MetadataRoute.Sitemap = ["", "/consistency", "/tools"].map((route) => {
    const changeFrequency: "daily" | "weekly" = route === "" ? "daily" : "weekly";
    return {
      url: `${siteUrl}${route}`,
      lastModified: new Date(),
      changeFrequency,
      priority: route === "" ? 1 : 0.7,
    };
  });

  return routes;
}

