# Geniq Website

Official website for **Geniq** — built with Next.js 14 (App Router).

## Features

- Landing page with marketing sections
- About page
- Contact page with form
- Pricing page
- Payments API integration
- Responsive UI with custom components

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** CSS Modules / Tailwind CSS
- **Payments:** API route for payment processing

## Project Structure

```
src/
├── app/
│   ├── (pages)/
│   │   ├── about/        # About page
│   │   ├── contact/      # Contact page
│   │   └── pricing/      # Pricing page
│   └── api/
│       └── payments/     # Payment API route
├── components/
│   ├── layout/           # Header, Footer, etc.
│   ├── sections/         # Page sections
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── styles/               # Global styles
└── types/                # TypeScript type definitions
public/
├── fonts/                # Custom fonts
├── icons/                # SVG icons
└── images/               # Static images
```

## Getting Started

### Prerequisites

- Node.js 18+
- npm / yarn / pnpm

### Installation

```bash
git clone https://github.com/nataligalagan88264-dotcom/geniq_website.git
cd geniq_website
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build

```bash
npm run build
npm start
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
# Add your environment variables here
NEXT_PUBLIC_SITE_URL=https://your-domain.com
```

## Deployment

The project can be deployed on [Vercel](https://vercel.com) with zero configuration:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/nataligalagan88264-dotcom/geniq_website)

## License

MIT
