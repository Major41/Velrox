import { extractPlainText } from "./text-extractor";

export function generatePostMetadata(post: {
  title: string;
  content: string;
  image?: string;
  slug: string;
  category: string;
  createdAt: string;
}) {
  const baseUrl =
    process.env.NEXT_PUBLIC_BASE_URL || "https://velrox-tech.netlify.app";
  const excerpt = extractPlainText(post.content, 160);

  // Use featured image if available, otherwise generate OG image
  const imageUrl = post.image
    ? post.image.startsWith("http")
      ? post.image
      : `${baseUrl}${post.image}`
    : `${baseUrl}/api/og?title=${encodeURIComponent(post.title)}&category=${encodeURIComponent(post.category)}`;

  return {
    title: post.title,
    description: excerpt,
    keywords: [post.category, "smartphone repair", "android"],
    openGraph: {
      title: post.title,
      description: excerpt,
      url: `${baseUrl}/post/${post.slug}`,
      type: "article" as const,
      publishedTime: post.createdAt,
      authors: ["Tech Fix Hub"],
      siteName: "Tech Fix Hub",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: post.title,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: post.title,
      description: excerpt,
      image: imageUrl,
      creator: "@techfixhub",
    },
  };
}
