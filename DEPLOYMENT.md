# Velrox - Deployment Guide

This guide will help you deploy Velrox to Vercel with all features working correctly.

## Prerequisites

Before deploying, ensure you have:

1. A GitHub repository with your Velrox code
2. A Vercel account (vercel.com)
3. A MongoDB Atlas database (mongodb.com)
4. A Cloudinary account (cloudinary.com)

## Step 1: Prepare Your Repository

1. Make sure all your code is pushed to GitHub
2. Verify `.env.local.example` is in your repository (but NOT `.env.local`)
3. Check that all dependencies are in `package.json`

## Step 2: Create MongoDB Database

1. Go to https://www.mongodb.com/cloud/atlas
2. Create a new project
3. Create a cluster (free tier is fine)
4. Create a database user with a strong password
5. Get your connection string:
   - Click "Connect" → "Drivers"
   - Copy the connection string
   - Replace `<password>` with your user's password
   - Replace `<database-name>` with your database name (e.g., `techfixhub`)

Example format:

```
mongodb+srv://user:password@cluster.mongodb.net/techfixhub?retryWrites=true&w=majority
```

## Step 3: Set Up Cloudinary

1. Go to https://cloudinary.com/
2. Sign up for a free account
3. Go to your dashboard
4. Copy these values:
   - Cloud Name (displayed in dashboard)
   - API Key (in Settings → API Keys)
   - Generate an API Secret in Settings → API Keys

## Step 4: Deploy to Vercel

### Option A: Using Vercel Dashboard (Recommended)

1. Go to https://vercel.com/dashboard
2. Click "Add New" → "Project"
3. Select your GitHub repository
4. In "Environment Variables" section, add:

```
MONGODB_URI=mongodb+srv://user:password@cluster.mongodb.net/techfixhub?retryWrites=true&w=majority
NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_SECRET_KEY=generate_a_random_secure_key_here
NEXT_PUBLIC_ADMIN_KEY=same_as_admin_secret_key
NEXT_PUBLIC_BASE_URL=https://yourdomain.vercel.app
```

To generate a secure key, you can use:

```bash
openssl rand -base64 32
```

5. Click "Deploy"
6. Wait for deployment to complete (usually 2-3 minutes)

### Option B: Using Vercel CLI

1. Install Vercel CLI:

```bash
npm i -g vercel
```

2. Login to Vercel:

```bash
vercel login
```

3. Deploy:

```bash
vercel --prod
```

4. Follow prompts and add environment variables when asked

5. Set permanent environment variables in Vercel dashboard after first deployment

## Step 5: Verify Deployment

After deployment:

1. Visit your Vercel deployment URL
2. Test the homepage - should load without errors
3. Test admin panel: `/admin` (may show empty list if no posts)
4. Create your first post:
   - Go to `/admin/create`
   - Fill in post details
   - Click "Create Post"
   - Check if it appears on homepage

## Common Issues & Solutions

### "Cannot find module 'mongoose'"

- Ensure `mongoose` is in `package.json`
- Run `pnpm install` locally and push changes
- Vercel will install dependencies automatically

### "MONGODB_URI is not set"

- Check environment variables in Vercel dashboard
- Ensure variable name is exactly `MONGODB_URI`
- Redeploy after adding variables

### "Unauthorized" on admin requests

- Verify `ADMIN_SECRET_KEY` and `NEXT_PUBLIC_ADMIN_KEY` are identical
- Check that both are set in Vercel environment variables
- Make sure values don't contain special characters that need escaping

### "Cloudinary upload fails"

- Verify `NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME` is correct
- Check `CLOUDINARY_API_KEY` and `CLOUDINARY_API_SECRET`
- Ensure Cloudinary account has upload quota remaining

### "Posts not loading"

- Check MongoDB connection string format
- Verify database name in connection string
- Test MongoDB connection in Atlas dashboard
- Check Vercel logs: Dashboard → Project → Deployments → Click latest → View logs

## Viewing Logs

To debug issues:

1. Go to Vercel Dashboard
2. Select your project
3. Click "Deployments" tab
4. Click the latest deployment
5. Click "View Function Logs" for real-time logs

## Setting Up Custom Domain

1. Go to your Vercel project settings
2. Click "Domains"
3. Add your custom domain
4. Follow instructions to update DNS records
5. Update `NEXT_PUBLIC_BASE_URL` to your domain URL

## Monitoring & Maintenance

### Weekly Checks

- Monitor error logs in Vercel dashboard
- Check database storage usage in MongoDB Atlas
- Review post performance and engagement

### Monthly Tasks

- Backup important posts (export from MongoDB)
- Update dependencies: `pnpm outdated`
- Review analytics and popular posts

### Security Best Practices

- Rotate `ADMIN_SECRET_KEY` periodically
- Keep MongoDB credentials secure
- Use strong passwords for all services
- Enable two-factor authentication on all accounts

## Updating Your Site

To deploy updates:

1. Make changes locally
2. Test with `pnpm dev`
3. Push to GitHub: `git push origin main`
4. Vercel automatically rebuilds and deploys
5. Check Vercel dashboard to confirm deployment

To manually trigger a rebuild:

1. Go to Vercel dashboard
2. Click your project
3. Click "Deployments"
4. Click the menu icon on latest deployment
5. Click "Redeploy"

## Performance Tips for Production

1. **Images**: Cloudinary automatically optimizes - no action needed
2. **Caching**: Posts are cached for 60 seconds - increase if needed
3. **Database**: Index the `slug` field for faster queries
4. **Analytics**: Add Google Analytics to track traffic

## Scaling for High Traffic

If your blog gets lots of traffic:

1. **MongoDB**: Consider upgrading from free tier
2. **Vercel**: Pro plan gives more function execution time
3. **Cloudinary**: Ensure pro plan for better performance
4. **CDN**: Vercel includes Edge Network automatically

## Support Resources

- Vercel Docs: https://vercel.com/docs
- MongoDB Docs: https://docs.mongodb.com
- Cloudinary Docs: https://cloudinary.com/documentation
- Next.js Docs: https://nextjs.org/docs

## Troubleshooting Checklist

Before contacting support:

- [ ] Check all environment variables are set
- [ ] Verify MongoDB connection string format
- [ ] Confirm Cloudinary credentials are correct
- [ ] Check Vercel deployment logs
- [ ] Test locally with `pnpm dev`
- [ ] Verify GitHub repository is up to date
- [ ] Check for error messages in browser console
- [ ] Review Vercel function logs

Good luck with your deployment! If you encounter issues, check the logs first - they usually contain helpful error messages.
