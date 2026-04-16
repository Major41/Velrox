# Velrox - Android Smartphone Repair Blog Platform

A full-stack Next.js blog platform for sharing Android smartphone repair tips, troubleshooting guides, and tech solutions. Built with MongoDB, Cloudinary, and Tailwind CSS for a modern, SEO-optimized experience.

## Features

### Core Blog Features

- **Dynamic Blog Posts**: Create, edit, and delete blog posts with a clean admin interface
- **Category System**: Organize posts into 5 categories (Charging Issues, Battery, Performance, Apps, Network)
- **Search Functionality**: Full-text search across post titles and content
- **Responsive Design**: Mobile-first design that works seamlessly on all devices
- **Featured Images**: Upload and display featured images with Cloudinary integration

### Admin Dashboard

- Protected admin area for managing posts
- Simple authentication using admin secret key
- Create/edit/delete posts with auto-slug generation
- Image upload directly from the admin panel

### Frontend Features

- Homepage with featured posts and category browsing
- Individual post pages with related articles
- Social sharing buttons (WhatsApp, Twitter, Facebook)
- Recent posts sidebar for better navigation
- Category filtering and search results pages

### SEO & Performance

- Dynamic meta tags and Open Graph support
- Structured data (JSON-LD) for rich snippets
- Sitemap and robots.txt for search engines
- Image optimization with Cloudinary
- Server-side rendering for fast initial page loads
- Caching strategies for better performance

## Prerequisites

- Node.js 18+
- MongoDB Atlas account (or local MongoDB)
- Cloudinary account (free tier available)

## Installation

1. **Clone the repository**

```bash
git clone <repository-url>
cd tech-fix-hub
```

2. **Install dependencies**

```bash
pnpm install
```

3. **Set up environment variables**
   Copy `.env.local.example` to `.env.local` and fill in your credentials:

```bash
cp .env.local.example .env.local
```

Required environment variables:

- `MONGODB_URI`: Your MongoDB connection string
- `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME`: Cloudinary cloud name
- `CLOUDINARY_API_KEY`: Cloudinary API key
- `CLOUDINARY_API_SECRET`: Cloudinary API secret
- `ADMIN_SECRET_KEY`: Secret key for admin authentication
- `NEXT_PUBLIC_ADMIN_KEY`: Public admin key for frontend requests
- `NEXT_PUBLIC_BASE_URL`: Your site's base URL (e.g., http://localhost:3000)

## Getting Started

### MongoDB Setup

1. Create a free MongoDB Atlas account: https://www.mongodb.com/cloud/atlas
2. Create a cluster and database
3. Get your connection string and add to `.env.local`

### Cloudinary Setup

1. Sign up for Cloudinary: https://cloudinary.com/
2. Get your cloud name, API key, and API secret
3. Add these to `.env.local`

### Running the Development Server

```bash
pnpm dev
```

Visit http://localhost:3000 to see the site.

## Usage

### Creating Your First Post

1. Navigate to http://localhost:3000/admin
2. Click "New Post"
3. Fill in the post details:
   - Title (auto-generates slug)
   - Category (choose from 5 options)
   - Content (main article body)
   - Featured Image (optional, upload via Cloudinary)
4. Click "Create Post"

### Admin Access

The admin panel uses a simple secret key authentication. You must pass the `NEXT_PUBLIC_ADMIN_KEY` header to make API requests from the frontend.

**Important**: Make sure to use different keys for development and production.

### Writing Post Content

Post content supports plain text with multiple paragraphs. Paragraphs are separated by blank lines in the content field.

Example:

```
First paragraph of your article. This is the introduction.

Second paragraph with more details and tips.

Third paragraph with additional information.
```

### SEO Tips

1. **Titles**: Write clear, descriptive titles with keywords
2. **Content**: Write at least 500+ words for better SEO
3. **Categories**: Choose the most relevant category
4. **Featured Images**: Use high-quality images (at least 1200x630px)
5. **Meta**: Each post automatically gets meta tags and OG tags

## Project Structure

```
tech-fix-hub/
├── app/
│   ├── api/                    # API routes
│   │   ├── posts/             # POST CRUD endpoints
│   │   ├── posts/[slug]/       # Individual post endpoints
│   │   ├── upload/            # Cloudinary upload endpoint
│   │   └── sitemap.xml/       # Dynamic sitemap
│   ├── admin/                 # Admin dashboard
│   │   ├── page.tsx           # Posts list
│   │   ├── create/            # Create post page
│   │   └── edit/[slug]/       # Edit post page
│   ├── (blog)/                # Blog pages group
│   │   ├── post/[slug]/       # Individual post page
│   │   ├── category/[category]/ # Category page
│   │   └── search/            # Search results page
│   ├── layout.tsx             # Root layout with header/footer
│   ├── page.tsx               # Homepage
│   └── globals.css            # Global styles
├── components/
│   ├── PostForm.tsx           # Create/edit post form
│   ├── BlogCard.tsx           # Post card component
│   ├── RelatedPosts.tsx       # Related articles section
│   ├── ShareButtons.tsx       # Social share buttons
│   ├── RecentPostsSidebar.tsx # Recent posts sidebar
│   └── ui/                    # Shadcn UI components
├── lib/
│   ├── db.ts                  # MongoDB connection
│   ├── models/
│   │   └── Post.ts            # Post schema
│   ├── cloudinary.ts          # Cloudinary utilities
│   └── metadata.ts            # SEO metadata helpers
├── public/
│   ├── robots.txt             # Search engine robots file
│   └── ...
├── .env.local                 # Environment variables (create this)
├── .env.local.example         # Example env variables
└── package.json
```

## API Endpoints

### Posts

**GET /api/posts**

- Fetch all posts or filter by category/search
- Query params: `category`, `search`
- Response: `{ success: boolean, data: Post[] }`

**GET /api/posts/[slug]**

- Fetch single post by slug
- Response: `{ success: boolean, data: Post }`

**POST /api/posts** (Admin only)

- Create new post
- Headers: `x-admin-key: your-admin-key`
- Body: `{ title, content, category, image }`
- Response: `{ success: boolean, data: Post }`

**PUT /api/posts/[slug]** (Admin only)

- Update post
- Headers: `x-admin-key: your-admin-key`
- Body: `{ title, content, category, image }`
- Response: `{ success: boolean, data: Post }`

**DELETE /api/posts/[slug]** (Admin only)

- Delete post
- Headers: `x-admin-key: your-admin-key`
- Response: `{ success: boolean, data: Post }`

### Upload

**POST /api/upload** (Admin only)

- Upload image to Cloudinary
- Headers: `x-admin-key: your-admin-key`
- Body: FormData with `file` field
- Response: `{ success: boolean, data: CloudinaryResponse }`

## Deployment

### Deploy to Vercel

1. Push your code to GitHub
2. Go to https://vercel.com and sign in
3. Click "Add New" → "Project"
4. Select your GitHub repository
5. Add environment variables in the dashboard
6. Click "Deploy"

### Deploy to Other Platforms

This is a standard Next.js app and can be deployed to:

- Railway
- Render
- Fly.io
- Self-hosted servers (using `next build && next start`)

## Customization

### Changing Colors

Edit `app/globals.css` to modify the color scheme. The design uses a warm orange-based primary color that can be customized:

```css
--primary: oklch(0.58 0.27 25); /* Change the primary color */
--accent: oklch(0.68 0.2 45); /* Change the accent color */
```

### Adding More Categories

1. Update the `CATEGORIES` array in `app/page.tsx`
2. Update the enum in `lib/models/Post.ts`
3. Restart the dev server

### Modifying Post Fields

To add new fields to posts (like author name, tags, etc.):

1. Update the Post schema in `lib/models/Post.ts`
2. Update the PostForm component in `components/PostForm.tsx`
3. Update API endpoints to handle new fields

## Performance Tips

1. **Images**: Always optimize images before uploading (Cloudinary does this automatically)
2. **Content**: Keep posts between 500-2000 words for best SEO
3. **Keywords**: Use relevant keywords naturally in titles and content
4. **Internal Links**: Link related posts to improve navigation
5. **Regular Updates**: Publish new content regularly to improve rankings

## SEO Checklist

- [ ] Set up Google Search Console
- [ ] Submit sitemap to Google
- [ ] Add meta descriptions to posts
- [ ] Use descriptive titles and headings
- [ ] Include featured images with alt text
- [ ] Write original content (500+ words)
- [ ] Build internal links between related posts
- [ ] Optimize images for web (Cloudinary handles this)
- [ ] Add JSON-LD structured data (automatic)
- [ ] Monitor search rankings and traffic

## Troubleshooting

### MongoDB Connection Error

- Check your connection string in `.env.local`
- Ensure IP address is whitelisted in MongoDB Atlas
- Verify network connectivity

### Cloudinary Upload Error

- Verify your cloud name and API keys
- Check that the `tech-fix-hub` folder exists or will be created
- Ensure your Cloudinary account has sufficient quota

### Admin Access Denied

- Double-check your `ADMIN_SECRET_KEY`
- Make sure it matches the key you're passing in requests
- Verify the key is set in `.env.local`

### Posts Not Showing

- Check that MongoDB has data (use MongoDB Atlas UI)
- Verify API route is responding: visit `/api/posts` in browser
- Check browser console for JavaScript errors

## Support

For issues, questions, or feature requests, please open an issue in the GitHub repository.

## License

MIT License - feel free to use this for your own projects!

## Getting Help

- Check the GitHub Issues for similar problems
- Review the code comments for additional context
- Check Next.js documentation: https://nextjs.org/docs
- Check MongoDB documentation: https://docs.mongodb.com
- Check Cloudinary documentation: https://cloudinary.com/documentation

Happy blogging! 🚀
