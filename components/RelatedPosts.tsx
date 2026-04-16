'use client';

import { useEffect, useState } from 'react';
import { BlogCard } from './BlogCard';

interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
  image?: string;
}

interface RelatedPostsProps {
  currentSlug: string;
  category: string;
  limit?: number;
}

export function RelatedPosts({
  currentSlug,
  category,
  limit = 3,
}: RelatedPostsProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(`/api/posts?category=${category}`);
        const result = await response.json();

        if (result.success) {
          // Filter out current post and limit results
          const relatedPosts = result.data
            .filter((post: Post) => post.slug !== currentSlug)
            .slice(0, limit);
          setPosts(relatedPosts);
        }
      } catch (error) {
        console.error('[v0] Error fetching related posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [currentSlug, category, limit]);

  if (isLoading || posts.length === 0) {
    return null;
  }

  return (
    <section className="mt-12 pt-12 border-t">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {posts.map((post) => (
          <BlogCard
            key={post._id}
            title={post.title}
            slug={post.slug}
            category={post.category}
            createdAt={post.createdAt}
            image={post.image}
          />
        ))}
      </div>
    </section>
  );
}
