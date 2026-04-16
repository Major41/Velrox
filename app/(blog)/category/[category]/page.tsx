'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { BlogCard } from '@/components/BlogCard';
import { toast } from 'sonner';

interface Post {
  _id: string;
  title: string;
  slug: string;
  category: string;
  createdAt: string;
  image?: string;
  content: string;
}

export default function CategoryPage() {
  const params = useParams();
  const category = params.category as string;
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const decodedCategory = decodeURIComponent(category);
        const response = await fetch(`/api/posts?category=${decodedCategory}`);
        const result = await response.json();

        if (result.success) {
          setPosts(result.data);
        } else {
          toast.error('Failed to fetch posts');
        }
      } catch (error) {
        console.error('[v0] Error fetching posts:', error);
        toast.error('Failed to fetch posts');
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [category]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg text-muted-foreground">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-2 text-balance">
          {decodeURIComponent(category)}
        </h1>
        <p className="text-muted-foreground mb-8">
          {posts.length} {posts.length === 1 ? 'post' : 'posts'} found
        </p>

        {posts.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-lg text-muted-foreground">
              No posts in this category yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <BlogCard
                key={post._id}
                title={post.title}
                slug={post.slug}
                category={post.category}
                createdAt={post.createdAt}
                image={post.image}
                excerpt={post.content.slice(0, 100) + '...'}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
