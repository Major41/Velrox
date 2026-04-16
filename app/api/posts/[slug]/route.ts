import { connectDB } from '@/lib/db';
import { Post } from '@/lib/models/Post';
import { NextRequest, NextResponse } from 'next/server';
import slugify from 'slug';

// GET single post by slug
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    await connectDB();

    const { slug } = await params;

    const post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('[v0] Error fetching post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch post' },
      { status: 500 }
    );
  }
}

// PUT update post
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Simple auth check
    const adminKey = request.headers.get('x-admin-key');
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { slug } = await params;
    const body = await request.json();
    const { title, content, category, image } = body;

    // Validate required fields
    if (!title || !content || !category) {
      return NextResponse.json(
        { success: false, error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Find the post
    let post = await Post.findOne({ slug });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    // If title changed, update slug
    let newSlug = slug;
    if (title !== post.title) {
      newSlug = slugify(title, { lower: true });

      // Check if new slug already exists
      const existingPost = await Post.findOne({ slug: newSlug });
      if (existingPost && existingPost._id.toString() !== post._id.toString()) {
        return NextResponse.json(
          { success: false, error: 'A post with this title already exists' },
          { status: 400 }
        );
      }
    }

    // Update post
    post.title = title;
    post.slug = newSlug;
    post.content = content;
    post.category = category;
    if (image !== undefined) {
      post.image = image;
    }

    await post.save();

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('[v0] Error updating post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to update post' },
      { status: 500 }
    );
  }
}

// DELETE post
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    // Simple auth check
    const adminKey = request.headers.get('x-admin-key');
    if (adminKey !== process.env.ADMIN_SECRET_KEY) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    await connectDB();

    const { slug } = await params;

    const post = await Post.findOneAndDelete({ slug });

    if (!post) {
      return NextResponse.json(
        { success: false, error: 'Post not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: post });
  } catch (error) {
    console.error('[v0] Error deleting post:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to delete post' },
      { status: 500 }
    );
  }
}
