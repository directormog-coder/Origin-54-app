# Origin 54 App

A luxury fashion storefront for African heritage-inspired products and artisan craftsmanship.

## Stack
- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- Supabase
- Zustand
- Paystack

## Setup
1. Install dependencies:
   ```bash
   npm install
   ```

2. Create `.env.local` from `.env.example` and fill in your credentials:
   ```bash
   cp .env.example .env.local
   ```

3. Run development server:
   ```bash
   npm run dev
   ```

4. Build for production:
   ```bash
   npm run build
   ```

5. Start production server:
   ```bash
   npm run start
   ```

## Available Scripts
- `npm run dev` - Development server
- `npm run build` - Production build
- `npm run start` - Production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
- `npm run format` - Format code with Prettier

## Project Structure
- `app/` - Next.js App Router pages and API routes
- `components/` - Reusable React components
- `lib/` - Utilities, hooks, state management
- `types/` - TypeScript type definitions
- `config/` - Configuration files
- `public/` - Static assets

## Key Features
- Server-side rendering with Next.js
- Responsive design with Tailwind CSS
- Shopping cart with Zustand state management
- Supabase integration for data
- Paystack payment integration
- Type-safe with TypeScript
