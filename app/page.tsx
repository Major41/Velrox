import { BlogCard } from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import Link from "next/link";

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
      `${process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"}/api/posts`,
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

const CATEGORIES = [
  "Charging Issues",
  "Battery",
  "Performance",
  "Apps",
  "Network",
];

export const metadata = {
  title: "Velrox - Android Smartphone Repair Tips & Guides",
  description:
    "Learn how to fix your Android smartphone with expert repair tips and guides. From charging issues to battery problems, we cover everything.",
  keywords: [
    "smartphone repair",
    "android fixes",
    "device troubleshooting",
    "tech support",
  ],
  openGraph: {
    title: "Velrox",
    description: "Android Smartphone Repair Tips & Guides",
    url: "https://techfixhub.com",
    type: "website",
  },
};

export default async function HomePage() {
  const posts = await getPosts();
  const featuredPost = posts[0];
  const recentPosts = posts.slice(1, 7);

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary/8 to-background py-20 md:py-28">
        <div className="container mx-auto px-4 text-center max-w-3xl">
          <div className="inline-block mb-4 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-semibold">
            Expert Smartphone Solutions
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 text-balance leading-tight">
            Velrox
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
            Expert guides and troubleshooting tips for your Android smartphone.
            Fix common issues, extend battery life, and optimize performance
            with our comprehensive guides.
          </p>
          <Link href="/search">
            <Button size="lg" className="text-base px-8">
              Start Exploring
            </Button>
          </Link>
        </div>
      </section>

      {/* Featured Post */}
      {featuredPost && (
        <section className="container mx-auto px-4 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Featured Article
          </h2>
          <div className="max-w-2xl">
            <BlogCard
              title={featuredPost.title}
              slug={featuredPost.slug}
              category={featuredPost.category}
              createdAt={featuredPost.createdAt}
              image={featuredPost.image}
              excerpt={featuredPost.content.slice(0, 150) + "..."}
            />
          </div>
        </section>
      )}

      {/* Categories */}
      <section className="bg-card/50 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Browse by Category
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-3">
            {CATEGORIES.map((category) => (
              <Link key={category} href={`/category/${category}`}>
                <div className="p-4 text-center bg-card border rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-300 cursor-pointer group">
                  <p className="font-semibold text-sm group-hover:text-primary transition-colors">
                    {category}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Recent Posts Grid */}
      {recentPosts.length > 0 && (
        <section className="container mx-auto px-4 py-16 md:py-20">
          <h2 className="text-2xl md:text-3xl font-bold mb-8">
            Latest Articles
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {recentPosts.map((post) => (
              <BlogCard
                key={post._id}
                title={post.title}
                slug={post.slug}
                category={post.category}
                createdAt={post.createdAt}
                image={post.image}
                excerpt={post.content.slice(0, 100) + "..."}
              />
            ))}
          </div>

          {posts.length > 7 && (
            <div className="mt-12 text-center">
              <Link href="/search">
                <Button variant="outline" size="lg">
                  View All Articles
                </Button>
              </Link>
            </div>
          )}
        </section>
      )}

      {/* Empty State */}
      {posts.length === 0 && (
        <section className="container mx-auto px-4 py-20 text-center">
          <p className="text-lg text-muted-foreground mb-4">
            No articles published yet. Check back soon for expert smartphone
            repair guides!
          </p>
        </section>
      )}
    </div>
  );
}
