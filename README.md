This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Features

### Weather Dashboard
Experience real-time weather data from around the world with our interactive Weather Dashboard:
- 🌍 Search weather by city/location
- 📊 Current weather with temperature, humidity, wind speed, visibility, and pressure
- 📅 5-day weather forecast
- ⭐ Save favorite cities for quick access
- 🌓 Dark mode / Light mode toggle
- 📱 Fully responsive design for desktop and mobile
- 🎨 Beautiful UI with weather icons

**Access the Weather Dashboard:** Visit `/weather` after starting the development server.

## Getting Started

### Prerequisites

1. **OpenWeatherMap API Key** (for Weather Dashboard)
   - Sign up for a free account at [OpenWeatherMap](https://openweathermap.org/api)
   - Generate an API key from your account dashboard
   - Copy `.env.example` to `.env.local`:
     ```bash
     cp .env.example .env.local
     ```
   - Add your API key to `.env.local`:
     ```
     NEXT_PUBLIC_OPENWEATHER_API_KEY=your_actual_api_key_here
     ```

### Installation

First, install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

Then, run the development server:

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
