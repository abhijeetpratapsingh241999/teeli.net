# 📦 Component Reference Guide

## All Reusable Components Created

---

## 1️⃣ SEO & Schema Components

### `src/lib/seo.ts`
**Purpose**: Global SEO configuration and metadata generation

**Usage**:
```tsx
import { generateMeta, generateBlogMeta } from '@/lib/seo';

// In page.tsx (Server Component)
export async function generateMetadata() {
  return generateMeta({
    title: "Page Title",
    description: "Page description",
    image: "/og-image.png",
    url: "https://teeli.net/page"
  });
}

// For blog posts
export async function generateMetadata() {
  return generateBlogMeta({
    title: post.title,
    description: post.excerpt,
    slug: post.slug,
    author: post.author,
    publishedTime: post.date,
    category: post.category,
    tags: post.keywords
  });
}
```

**Features**:
- OpenGraph tags
- Twitter Card tags
- Canonical URLs
- Keywords management
- Author attribution

---

### `src/components/schema/generateFAQSchema.tsx`
**Purpose**: FAQ rich snippets for Google search results

**Usage**:
```tsx
import { FAQSchema } from '@/components/schema/generateFAQSchema';

// In any page with FAQ section
<FAQSchema 
  faqs={[
    { question: "What is this?", answer: "It's awesome." },
    { question: "How much?", answer: "$100-$400" }
  ]} 
/>
```

**SEO Impact**:
- Rich snippets in Google
- FAQ accordion in search results
- Increased click-through rate

---

### `src/components/schema/generateArticleSchema.tsx`
**Purpose**: Article structured data for blog posts

**Usage**:
```tsx
import { ArticleSchema } from '@/components/schema/generateArticleSchema';

<ArticleSchema
  title="Blog Post Title"
  description="Post excerpt"
  url="https://teeli.net/blog/slug"
  image="https://teeli.net/image.webp"
  author="TEELI Team"
  publishedTime="2026-01-05"
  category="Tech"
  keywords={["AI", "3D", "rendering"]}
/>
```

**SEO Impact**:
- Rich article previews
- Author attribution
- Published date display
- Enhanced search visibility

---

## 2️⃣ UI Components

### `src/components/ui/Accordion.tsx`
**Purpose**: Premium glass FAQ accordion with animations

**Props**:
```typescript
interface AccordionProps {
  items: { question: string; answer: string }[];
  title?: string;
  className?: string;
}
```

**Usage**:
```tsx
import Accordion from '@/components/ui/Accordion';

<Accordion 
  items={faqItems}
  title="Frequently Asked Questions"
  className="my-8"
/>
```

**Features**:
- Glass morphism design
- Lucide React icons
- Smooth expand/collapse
- Keyboard accessible
- Mobile responsive

**Styling**:
- Uses `glass-card` class
- Cyan/purple color scheme
- Hover effects
- Max-height transitions

---

### `src/components/ui/TableOfContents.tsx`
**Purpose**: Auto-generated TOC from markdown headings

**Props**:
```typescript
interface TableOfContentsProps {
  content: string;  // Markdown content
  className?: string;
}
```

**Usage**:
```tsx
import TableOfContents from '@/components/ui/TableOfContents';

<TableOfContents 
  content={post.content}
  className="sticky top-24"
/>
```

**Features**:
- Extracts H2 and H3 headings
- Active section highlighting
- Smooth scroll navigation
- Sticky positioning
- Scroll spy tracking

**Layout**:
- Desktop: Sidebar (lg:block)
- Mobile/Tablet: Hidden
- Max height with scroll

---

### `src/components/ui/ImageOptimized.tsx`
**Purpose**: Next.js Image wrapper with loading states

**Props**:
```typescript
interface ImageOptimizedProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
  fill?: boolean;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}
```

**Usage**:
```tsx
import ImageOptimized from '@/components/ui/ImageOptimized';

// Standard image
<ImageOptimized
  src="/blog/image.webp"
  alt="Description"
  width={1200}
  height={675}
  priority={false}
  sizes="(max-width: 768px) 100vw, 50vw"
/>

// Fill container
<ImageOptimized
  src="/hero.webp"
  alt="Hero"
  fill
  objectFit="cover"
  priority={true}
/>
```

**Features**:
- Lazy loading by default
- Loading skeleton (pulse animation)
- Error handling with fallback
- Responsive sizes attribute
- Quality: 90 (optimized)

---

## 3️⃣ Blog Components

### `src/components/blog/BlogMeta.tsx`
**Purpose**: Display blog metadata (date, author, read time, category)

**Props**:
```typescript
interface BlogMetaProps {
  date: string;
  readTime: string;
  author?: string;
  authorRole?: string;
  category?: string;
  className?: string;
}
```

**Usage**:
```tsx
import BlogMeta from '@/components/blog/BlogMeta';

<BlogMeta
  date="Jan 5, 2026"
  readTime="11 min read"
  author="TEELI Team"
  authorRole="Architectural Experts"
  category="Architecture & Design"
/>
```

**Features**:
- Lucide React icons
- Conditional author rendering
- Category badge with gradient
- Responsive flex layout
- Author role subtitle

**Icons**:
- Calendar (date)
- Clock (read time)
- User (author)

---

### `src/components/blog/RelatedPosts.tsx`
**Purpose**: Related article suggestions with glass cards

**Props**:
```typescript
interface RelatedPostsProps {
  posts: BlogPost[];
  title?: string;
  className?: string;
}
```

**Usage**:
```tsx
import RelatedPosts from '@/components/blog/RelatedPosts';

<RelatedPosts 
  posts={relatedPosts}
  title="You Might Also Like"
/>
```

**Features**:
- Glass card design
- Image optimization
- Hover animations
- Responsive grid (1/2/3 cols)
- Category badges
- Read More with arrow
- Line-clamp titles/excerpts

**Layout**:
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

---

## 4️⃣ Layout Components (Existing, Enhanced)

### `src/components/Header.tsx`
**Status**: Already exists, preserved

**Features**:
- Glass navbar
- Dropdown menus
- Mobile hamburger
- AnimatedGlobe logo
- Sticky positioning

---

### `src/components/Footer.tsx`
**Status**: Already exists, preserved

**Features**:
- Theme-aware
- Social links
- Grid layout
- Fine line grid background

---

## 5️⃣ Blog Page Structure

### `src/app/blog/[slug]/BlogPostClient.tsx`
**Purpose**: Main blog post rendering component

**Architecture**:
```tsx
BlogPostClient (Theme Provider)
└── BlogPostContent
    ├── <ArticleSchema />      // JSON-LD
    ├── <FAQSchema />          // JSON-LD
    ├── <Header />
    ├── <BlogThemeToggle />
    └── <main>
        ├── <article> (8 cols)
        │   ├── Category Badge
        │   ├── H1 Title
        │   ├── <BlogMeta />
        │   ├── Excerpt
        │   ├── Featured Image
        │   ├── Content (.prose-custom)
        │   ├── <Accordion /> (FAQ)
        │   ├── CTA Section
        │   └── <RelatedPosts />
        └── <aside> (4 cols, desktop only)
            └── <TableOfContents />
```

**Grid Layout**:
```
Desktop (lg+):   8 cols content + 4 cols sidebar
Tablet/Mobile:   12 cols stacked
```

---

## 6️⃣ Global Styles

### `src/app/globals.css`
**Premium Glass Variables**:
```css
:root {
  --glass-bg: rgba(255, 255, 255, 0.08);
  --glass-bg-light: rgba(255, 255, 255, 0.25);
  --glass-border: rgba(255, 255, 255, 0.18);
  --glass-border-light: rgba(255, 255, 255, 0.35);
  --glass-blur: 16px;
  --glass-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.15);
  
  --gradient-primary: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  --gradient-accent: linear-gradient(135deg, #06b6d4 0%, #8b5cf6 100%);
}
```

**Glass Card Class**:
```css
.glass-card {
  backdrop-filter: blur(var(--glass-blur));
  background: var(--glass-bg);
  border: 1px solid var(--glass-border);
  border-radius: 16px;
  box-shadow: var(--glass-shadow);
}
```

**Prose Typography**:
```css
.prose-custom h1 - Gradient cyan→purple
.prose-custom h2 - Cyan headings
.prose-custom h3 - Purple headings
.prose-custom p  - Zinc-200, relaxed
```

---

## 7️⃣ Data Structure

### `src/lib/blog.ts`
**BlogPost Interface**:
```typescript
interface BlogPost {
  id: number;
  slug: string;
  title: string;
  metaTitle?: string;          // NEW
  metaDescription?: string;    // NEW
  category: string;
  date: string;
  author: string;
  authorRole?: string;
  excerpt: string;
  readTime: string;
  featured?: boolean;
  image?: string;
  content?: string;
}
```

---

## 8️⃣ Quick Import Reference

```tsx
// SEO
import { generateMeta, generateBlogMeta } from '@/lib/seo';
import { ArticleSchema } from '@/components/schema/generateArticleSchema';
import { FAQSchema } from '@/components/schema/generateFAQSchema';

// UI Components
import Accordion from '@/components/ui/Accordion';
import TableOfContents from '@/components/ui/TableOfContents';
import ImageOptimized from '@/components/ui/ImageOptimized';

// Blog Components
import BlogMeta from '@/components/blog/BlogMeta';
import RelatedPosts from '@/components/blog/RelatedPosts';

// Layout
import Header from '@/components/Header';
import Footer from '@/components/Footer';
```

---

## 9️⃣ Color Palette

```css
Primary: #06b6d4 (cyan-500)
Secondary: #8b5cf6 (purple-500)
Accent: #ec4899 (pink-500)

Text:
- Headings: white / cyan-300 / purple-300
- Body: zinc-200 / zinc-300
- Muted: zinc-400 / zinc-500

Backgrounds:
- Dark: #000000
- Glass: rgba(255, 255, 255, 0.08)
- Card: gray-900/50
```

---

## 🔟 Responsive Breakpoints

```javascript
sm:  640px   // Small tablets
md:  768px   // Tablets
lg:  1024px  // Desktops (TOC appears)
xl:  1280px  // Large desktops
2xl: 1536px  // Extra large screens
```

---

## 1️⃣1️⃣ Component Checklist

When creating new pages, use this checklist:

✅ Import necessary components
✅ Add `<ArticleSchema />` for SEO
✅ Add `<FAQSchema />` if FAQ exists
✅ Use `<ImageOptimized />` for images
✅ Apply `.prose-custom` to content
✅ Add `<TableOfContents />` for long content
✅ Use `<Accordion />` for FAQs
✅ Add `<RelatedPosts />` at bottom
✅ Include `<BlogMeta />` for post info
✅ Test responsive layout
✅ Validate JSON-LD schemas

---

**All components are production-ready and SEO-optimized!** 🎉
