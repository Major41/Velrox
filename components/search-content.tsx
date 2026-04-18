"use client";

import { useState, useEffect, Suspense } from "react";
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

// Inner component that uses useSearchParams
function SearchResults() {
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
      console.error("Error searching posts:", error);
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
    <>
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
                  excerpt={post.content}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </>
  );
}

// Main component with Suspense boundary
export default function SearchContent() {
  return (
    <Suspense fallback={<div className="text-center py-12">Loading search...</div>}>
      <SearchResults />
    </Suspense>
  );
}