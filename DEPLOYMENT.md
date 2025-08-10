# Vercel Deployment Guide

This guide explains how to deploy your Node.js Express API to Vercel.

## Prerequisites

- Node.js 18.17.0 or higher
- npm 9.0.0 or higher
- Vercel CLI installed globally

## Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Build the project:**
   ```bash
   npm run build
   ```

## Deployment Options

### Option 1: Deploy via Vercel CLI

1. **Login to Vercel:**

   ```bash
   vercel login
   ```

2. **Deploy to production:**

   ```bash
   npm run deploy
   ```

3. **Or deploy to preview:**
   ```bash
   vercel
   ```

### Option 2: Deploy via Vercel Dashboard

1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Vercel
3. Vercel will automatically deploy on every push

## Configuration

The project includes:

- `vercel.json` - Vercel configuration
- `api/index.ts` - Serverless function entry point
- `.vercelignore` - Files to exclude from deployment

## Environment Variables

Set these in your Vercel dashboard:

- `NODE_ENV=production`
- `PORT` (optional, Vercel sets this automatically)

## API Endpoints

After deployment, your API will be available at:

- Health check: `https://your-domain.vercel.app/health`
- Users API: `https://your-domain.vercel.app/api/users`

## Local Development

```bash
npm run dev
```

## Testing

```bash
npm test
npm run test:coverage
```

## Build

```bash
npm run build
npm run vercel-build
```

## Troubleshooting

- Ensure all dependencies are in `package.json`
- Check that `@vercel/node` is installed
- Verify TypeScript compilation works
- Check Vercel function logs in dashboard
