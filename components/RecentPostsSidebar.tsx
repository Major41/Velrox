'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { format } from 'date-fns';

interface Post {
  _id: string;
  title: string;
  slug: string;
  createdAt: string;
}

interface RecentPostsSidebarProps {
  limit?: number;
  currentSlug?: string;
}

export function RecentPostsSidebar({
  limit = 5,
  currentSlug,
}: RecentPostsSidebarProps) {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/posts');
        const result = await response.json();

        if (result.success) {
          // Filter out current post if provided and limit results
          let recentPosts = result.data;
          if (currentSlug) {
            recentPosts = recentPosts.filter((post: Post) => post.slug !== currentSlug);
          }
          setPosts(recentPosts.slice(0, limit));
        }
      } catch (error) {
        console.error('[v0] Error fetching recent posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, [limit, currentSlug]);

  if (isLoading || posts.length === 0) {
    return null;
  }

  return (
    <Card className="sticky top-20">
      <CardHeader>
        <CardTitle className="text-lg">Recent Posts</CardTitle>
      </CardHeader>
      <CardContent>
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id}>
              <Link
                href={`/post/${post.slug}`}
                className="group block"
              >
                <p className="font-medium text-sm group-hover:text-primary transition-colors line-clamp-2">
                  {post.title}
                </p>
                <time className="text-xs text-muted-foreground">
                  {format(new Date(post.createdAt), 'MMM d, yyyy')}
                </time>
              </Link>
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}
