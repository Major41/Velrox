"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import Image from "next/image";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";

interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
  image?: string;
  content: string;
}

const CATEGORIES = [
  "Charging Issues",
  "Battery",
  "Performance",
  "Apps",
  "Network",
];

export function HomePageContent({ posts }: { posts: Post[] }) {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredPosts = useMemo(() => {
    if (!selectedCategory) {
      return posts;
    }
    return posts.filter((post) => post.category === selectedCategory);
  }, [posts, selectedCategory]);

  const featuredPost = filteredPosts[0];
  const sidebarPosts = filteredPosts.slice(1, 4);

  if (posts.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-lg text-muted-foreground">
          No articles published yet. Check back soon.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Featured Article Section */}
      {featuredPost && (
        <section className="container mx-auto px-4 py-4 md:py-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 lg:gap-8">
            {/* Main Featured Article - 2 columns on desktop */}
            <Link href={`/post/${featuredPost.slug}`} className="lg:col-span-2">
              <article className="group cursor-pointer h-full">
                {/* Featured Image */}
                {featuredPost.image && (
                  <div className="relative w-full h-96 md:h-[500px] lg:h-[550px] bg-muted rounded-xl overflow-hidden mb-6">
                    <Image
                      src={featuredPost.image}
                      alt={featuredPost.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                      priority
                    />
                  </div>
                )}

                {/* Featured Article Content */}
                <div>
                  <div className="flex items-center gap-3 mb-4 flex-wrap">
                    <time className="text-sm uppercase tracking-wider text-muted-foreground font-medium">
                      {format(new Date(featuredPost.createdAt), "MMM d, yyyy")}
                    </time>
                    <span className="inline-flex px-3 py-1 text-xs font-semibold bg-primary text-primary-foreground rounded-full">
                      {featuredPost.category}
                    </span>
                  </div>
                  <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 group-hover:text-primary transition-colors line-clamp-4 text-balance">
                    {featuredPost.title}
                  </h1>
                  <p className="text-muted-foreground text-base md:text-lg group-hover:text-primary transition-colors">
                    Read article →
                  </p>
                </div>
              </article>
            </Link>

            {/* Sidebar - Recent Articles (Hidden on mobile) */}
            {sidebarPosts.length > 0 && (
              <div className="hidden lg:flex lg:flex-col gap-6">
                <div className="space-y-4">
                  {sidebarPosts.map((post) => (
                    <Link key={post._id} href={`/post/${post.slug}`}>
                      <Card className="p-4 hover:shadow-lg transition-shadow duration-300 h-full group cursor-pointer border-0 bg-card/50 hover:bg-card">
                        {post.image && (
                          <div className="relative w-full h-32 bg-muted rounded-lg overflow-hidden mb-3">
                            <Image
                              src={post.image}
                              alt={post.title}
                              fill
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                        )}
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-primary/15 text-primary rounded mb-2">
                          {post.category}
                        </span>
                        <h3 className="font-bold text-sm line-clamp-2 group-hover:text-primary transition-colors mb-2">
                          {post.title}
                        </h3>
                        <p className="text-xs text-muted-foreground">
                          {format(new Date(post.createdAt), "MMM d")}
                        </p>
                      </Card>
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* Category Filter Section */}
      <section className="border-y bg-card/50 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-2 md:gap-3 justify-center md:justify-start">
            <button
              onClick={() => setSelectedCategory(null)}
              className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                selectedCategory === null
                  ? "bg-primary text-primary-foreground shadow-lg"
                  : "bg-background border border-border hover:border-primary text-foreground hover:text-primary"
              }`}
            >
              All
            </button>
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 md:px-6 py-2 md:py-3 rounded-full font-semibold transition-all duration-300 text-sm md:text-base whitespace-nowrap ${
                  selectedCategory === category
                    ? "bg-primary text-primary-foreground shadow-lg"
                    : "bg-background border border-border hover:border-primary text-foreground hover:text-primary"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* All Articles Grid */}
      {filteredPosts.length > 1 && (
        <section className="container mx-auto px-4 py-16 md:py-20">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-max">
            {/* Show all remaining articles in grid (skip featured article) */}
            {filteredPosts.slice(1).map((post) => (
              <Link key={post._id} href={`/post/${post.slug}`}>
                <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0 group cursor-pointer">
                  {post.image && (
                    <div className="relative h-48 w-full overflow-hidden bg-muted">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                  )}
                  <div className="p-5">
                    <div className="flex items-center justify-between gap-2 mb-3 flex-wrap">
                      <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/15 text-primary rounded-full">
                        {post.category}
                      </span>
                      <time className="text-xs text-muted-foreground">
                        {format(new Date(post.createdAt), "MMM d")}
                      </time>
                    </div>
                    <h3 className="font-bold text-base mb-2 line-clamp-3 group-hover:text-primary transition-colors text-balance">
                      {post.title}
                    </h3>
                  </div>
                </Card>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
