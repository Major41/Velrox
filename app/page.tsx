import { HomePageContent } from "@/components/HomePageContent";
import type { Metadata } from "next";

interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
  image?: string;
  content: string;
}

async function getPosts() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/posts`,
      { next: { revalidate: 60 } },
    );

    if (!response.ok) {
      return [];
    }

    const result = await response.json();
    return result.success ? result.data : [];
  } catch (error) {
    console.error("[v0] Error fetching posts:", error);
    return [];
  }
}

export const metadata: Metadata = {
  title: "Tech Fix Hub - Android Smartphone Repair Tips & Guides",
  description:
    "Latest articles on Android smartphone repair, troubleshooting, and optimization tips.",
  keywords: [
    "smartphone repair",
    "android fixes",
    "device troubleshooting",
    "tech support",
  ],
  openGraph: {
    title: "Tech Fix Hub",
    description: "Android Smartphone Repair Tips & Guides",
    url: "https://velrox-tech.netlify.app",
    type: "website",
  },
};

export default async function HomePage() {
  const posts = await getPosts();

  return <HomePageContent posts={posts} />;
}
