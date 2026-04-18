import { extractPlainText } from "./text-extractor";

export function generatePostMetadata(post: {
  title: string;
  content: string;
  image?: string;
  slug: string;
  category: string;
  createdAt: string;
}) {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://techfixhub.com";
  const excerpt = extractPlainText(post.content, 160);

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
      images: post.image
        ? [
            {
              url: post.image,
              width: 1200,
              height: 630,
              alt: post.title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image" as const,
      title: post.title,
      description: excerpt,
      image: post.image,
    },
  };
}
