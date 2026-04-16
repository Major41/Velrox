// app/(blog)/search/page.jsx (or .tsx)
"use client";

import { Suspense } from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { BlogCard } from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
  image?: string;
  content: string;
}

// Separate component that uses useSearchParams
function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(!!initialQuery);

  useEffect(() => {
    if (initialQuery) {
      performSearch(initialQuery);
    }
  }, [initialQuery]);

  const performSearch = async (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setPosts([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `/api/posts?search=${encodeURIComponent(searchQuery)}`,
      );
      const result = await response.json();

      if (result.success) {
        setPosts(result.data);
        setHasSearched(true);
      } else {
        toast.error("Failed to search posts");
      }
    } catch (error) {
      console.error("[v0] Error searching posts:", error);
      toast.error("Failed to search posts");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    performSearch(query);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Search Posts</h1>

        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-2">
            <Input
              placeholder="Search by title or content..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              Search
            </button>
          </div>
        </form>

        {hasSearched && (
          <div>
            <p className="text-muted-foreground mb-6">
              {posts.length} {posts.length === 1 ? "result" : "results"} found
              {query && ` for "${query}"`}
            </p>

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground">
                  No posts found. Try different keywords.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {posts.map((post) => (
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
            )}
          </div>
        )}
      </div>
    </div>
  );
}

// Loading fallback component
function SearchLoading() {
  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">Search Posts</h1>
        <div className="mb-8">
          <div className="flex gap-2">
            <div className="flex-1 h-10 bg-muted animate-pulse rounded-md" />
            <div className="px-4 py-2 h-10 bg-muted animate-pulse rounded-md w-20" />
          </div>
        </div>
        <div className="text-center py-12">
          <p className="text-muted-foreground">Loading search...</p>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense boundary
export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchContent />
    </Suspense>
  );
}
