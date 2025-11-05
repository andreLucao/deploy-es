This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Responsive Design

This project implements a mobile-first responsive design approach using Tailwind CSS with the following features:

### Global Responsive Classes
- `container-responsive`: Responsive container with proper padding
- `container-full`: Full-width container with responsive padding
- `grid-responsive-1` to `grid-responsive-4`: Responsive grid layouts
- `text-responsive-sm` to `text-responsive-2xl`: Responsive typography
- `spacing-responsive-sm` to `spacing-responsive-lg`: Responsive spacing
- `flex-responsive-col` and `flex-responsive-row`: Responsive flex layouts

### Breakpoints
- `sm`: 640px+ (Mobile landscape)
- `md`: 768px+ (Tablet)
- `lg`: 1024px+ (Desktop)
- `xl`: 1280px+ (Large desktop)
- `2xl`: 1536px+ (Extra large desktop)

### Utility Hooks
- `useBreakpoint()`: Detect current breakpoint
- `useMediaQuery()`: Custom media query hook

### Components
- `ResponsiveWrapper`: Container component with responsive options
- `ResponsiveGrid`: Grid component with responsive columns

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
