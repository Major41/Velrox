import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { format } from 'date-fns';

interface BlogCardProps {
  title: string;
  slug: string;
  category: string;
  createdAt: string;
  image?: string;
  excerpt?: string;
}

export function BlogCard({
  title,
  slug,
  category,
  createdAt,
  image,
  excerpt,
}: BlogCardProps) {
  return (
    <Link href={`/post/${slug}`}>
      <Card className="h-full overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border-0">
        {image && (
          <div className="relative h-48 w-full overflow-hidden bg-slate-100 group">
            <Image
              src={image}
              alt={title}
              fill
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          </div>
        )}
        <CardContent className="p-5">
          <div className="flex items-center justify-between gap-2 mb-3">
            <span className="inline-block px-3 py-1 text-xs font-semibold bg-primary/15 text-primary rounded-full">
              {category}
            </span>
            <time className="text-xs text-muted-foreground">
              {format(new Date(createdAt), 'MMM d')}
            </time>
          </div>
          <h3 className="font-bold text-base mb-2 line-clamp-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
              {excerpt}
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
