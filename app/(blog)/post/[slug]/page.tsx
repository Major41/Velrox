import Image from "next/image";
import { notFound } from "next/navigation";
import { format } from "date-fns";
import { ShareButtons } from "@/components/ShareButtons";
import { RelatedPosts } from "@/components/RelatedPosts";
import { RecentPostsSidebar } from "@/components/RecentPostsSidebar";
import { generatePostMetadata } from "@/lib/metadata";
import { renderHtmlContent } from "@/lib/html-renderer";
import type { Metadata } from "next";

interface Post {
  _id: string;
  title: string;
  slug: string;
  content: string;
  category: string;
  image?: string;
  createdAt: string;
  updatedAt: string;
}

async function getPost(slug: string): Promise<Post | null> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/posts/${slug}`,
      { next: { revalidate: 60 } },
    );

    if (!response.ok) {
      return null;
    }

    const result = await response.json();
    return result.success ? result.data : null;
  } catch (error) {
    console.error("[v0] Error fetching post:", error);
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    return {
      title: "Post Not Found",
    };
  }

  const metadata = generatePostMetadata(post);

  return {
    title: metadata.title,
    description: metadata.description,
    keywords: metadata.keywords,
    openGraph: metadata.openGraph,
    twitter: metadata.twitter,
  };
}

export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  const postUrl = `${baseUrl}/post/${post.slug}`;

  // Render HTML content safely
  const renderedContent = renderHtmlContent(post.content);

  return (
    <article className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-6xl">
        {/* Main content with sidebar */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main content - col span 2 */}
          <div className="lg:col-span-2">
            {/* Header */}
            <header className="mb-8">
              <div className="flex items-center gap-3 mb-4">
                <span className="inline-block px-4 py-2 text-sm font-semibold bg-primary/15 text-primary rounded-full">
                  {post.category}
                </span>
                <time className="text-sm text-muted-foreground">
                  {format(new Date(post.createdAt), "MMMM d, yyyy")}
                </time>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight text-balance">
                {post.title}
              </h1>

              {/* Featured Image */}
              {post.image && (
                <div className="relative w-full h-96 bg-slate-100 rounded-xl overflow-hidden mb-6">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              )}

              {/* Share Buttons */}
              <div className="border-y py-4 mb-8">
                <ShareButtons title={post.title} url={postUrl} />
              </div>
            </header>

            {/* Content */}
            <section className="prose prose-sm sm:prose max-w-none mb-12">
              <div
                dangerouslySetInnerHTML={{ __html: renderedContent }}
                className="text-foreground"
              />
            </section>

            {/* Updated info */}
            <div className="text-sm text-muted-foreground border-t pt-4 mb-12 py-4">
              <p>
                Last updated:{" "}
                <time dateTime={post.updatedAt}>
                  {format(new Date(post.updatedAt), "MMMM d, yyyy")}
                </time>
              </p>
            </div>

            {/* Related Posts */}
            <RelatedPosts currentSlug={post.slug} category={post.category} />
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <RecentPostsSidebar currentSlug={post.slug} limit={5} />
          </div>
        </div>
      </div>
    </article>
  );
}

export async function generateStaticParams() {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/posts`,
    );
    const result = await response.json();

    if (!result.success) {
      return [];
    }

    return result.data.map((post: Post) => ({
      slug: post.slug,
    }));
  } catch (error) {
    console.error("[v0] Error generating static params:", error);
    return [];
  }
}
