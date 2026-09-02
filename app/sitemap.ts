import { MetadataRoute } from "next";
import { projects } from "@/lib/projects";
import { posts } from "@/lib/posts";

const BASE_URL = "https://infomythweb.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    { url: BASE_URL, lastModified: new Date() },
    { url: `${BASE_URL}/work`, lastModified: new Date() },
    { url: `${BASE_URL}/blog`, lastModified: new Date() },
    { url: `${BASE_URL}/contact`, lastModified: new Date() },
    ...projects.map((project) => ({
      url: `${BASE_URL}/work/${project.id}`,
      lastModified: new Date(),
    })),
    ...posts.map((post) => ({
      url: `${BASE_URL}/blog/${post.slug}`,
      lastModified: new Date(post.date),
    })),
  ];
}
