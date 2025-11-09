# Blog Typography Guide

This guide explains how to use the **centralized and reusable** blog typography system for all future blog posts.

## 🎯 Overview

All blog typography styles (headings, body text, colors, fonts) are centralized in:
- **Configuration**: `src/styles/blog-typography.ts`
- **Helper Functions**: Export reusable className generators

This ensures **consistency** and makes it easy to update all blogs by changing a single file.

---

## ✅ How to Use in New Blog Components

### 1. Import Helper Functions

```typescript
import { getHeadingClasses, getBodyClasses, getLinkClasses } from '@/styles/blog-typography';
import { useBlogTheme } from '@/components/BlogThemeProvider';
```

### 2. Use Helper Functions in Your Component

```tsx
export default function YourNewBlogComponent() {
  const { theme } = useBlogTheme();
  
  return (
    <article>
      {/* H2 Heading - Dark Blue */}
      <h2 className={getHeadingClasses('h2', theme)}>
        Your Section Title
      </h2>
      
      {/* H3 Heading - Dark Blue */}
      <h3 className={getHeadingClasses('h3', theme)}>
        Your Subsection
      </h3>
      
      {/* Paragraph */}
      <p className={getBodyClasses('paragraph', theme)}>
        Your content text here...
      </p>
      
      {/* List */}
      <ul className={getBodyClasses('list', theme)}>
        <li>List item 1</li>
        <li>List item 2</li>
      </ul>
      
      {/* Link */}
      <a href="#" className={getLinkClasses(theme)}>
        Read more
      </a>
    </article>
  );
}
```

---

## 🎨 Current Typography Settings

### Headings

| Element | Size (Mobile → Desktop) | Color (Light Mode) | Color (Dark Mode) | Weight |
|---------|------------------------|-------------------|------------------|--------|
| **H1**  | 32px → 44px            | Gray-900          | White            | Bold   |
| **H2**  | 28px → 36px            | **Blue-800** (Dark Blue) | **Blue-400** (Bright Blue) | Semibold |
| **H3**  | 22px → 28px            | **Blue-700** (Medium Blue) | **Blue-300** (Light Blue) | Semibold |

### Body Text

- **Font**: System fonts (optimized for readability)
- **Size**: 16px → 18px (responsive)
- **Line Height**: Relaxed (1.75)
- **Color**: Neutral-800 (light) / Neutral-200 (dark)

### Links

- **Color**: Blue-700/900 (light) / Blue-400/300 (dark)
- **Decoration**: Underline with hover effect

---

## 🛠️ How to Customize Globally

To change colors, sizes, or fonts **for all blogs**, edit `src/styles/blog-typography.ts`:

### Example: Change H2 Color

```typescript
h2: {
  sizes: 'text-[28px] sm:text-[32px] md:text-[36px]',
  weight: 'font-semibold',
  colors: {
    light: 'text-purple-800',  // Change from blue-800 to purple-800
    dark: 'text-purple-400',   // Change from blue-400 to purple-400
  },
  spacing: 'mb-3 sm:mb-4 mt-[32px] sm:mt-[40px]',
  alignment: 'text-center md:text-left',
  scroll: 'scroll-mt-24',
}
```

**Result**: All H2 headings across ALL blog posts will automatically use purple instead of blue! 🎉

---

## 🔧 Available Helper Functions

### 1. `getHeadingClasses(level, theme)`
Generates complete className for headings.

**Parameters:**
- `level`: `'h1' | 'h2' | 'h3'`
- `theme`: `'light' | 'dark'`

**Returns:** String with all classes (size, weight, color, spacing, etc.)

**Example:**
```tsx
<h2 className={getHeadingClasses('h2', theme)}>
  Title
</h2>
```

### 2. `getBodyClasses(type, theme)`
Generates className for body text (paragraphs/lists).

**Parameters:**
- `type`: `'paragraph' | 'list'`
- `theme`: `'light' | 'dark'`

**Returns:** String with size, spacing, color, line-height

**Example:**
```tsx
<p className={getBodyClasses('paragraph', theme)}>
  Content text
</p>
```

### 3. `getLinkClasses(theme)`
Generates className for links.

**Parameters:**
- `theme`: `'light' | 'dark'`

**Returns:** String with color and decoration classes

**Example:**
```tsx
<a href="#" className={getLinkClasses(theme)}>
  Click here
</a>
```

---

## 📦 Font Optimization

**Current Font Stack:**

```typescript
fonts: {
  heading: 'font-sans',    // System fonts
  body: 'font-sans',       // System fonts
}
```

**System Fonts Used (defined in `tailwind.config.ts`):**

```
-apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen, Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif
```

**Why System Fonts?**
- ✅ **Light**: No custom font files to load
- ✅ **Eye-catching**: Clean, modern appearance
- ✅ **Great for reading**: Optimized by OS vendors for readability
- ✅ **Fast**: Zero network requests, instant rendering
- ✅ **Native**: Looks natural on every device

**Alternative: Custom Fonts**

If you want to use custom fonts for more personality, consider:
- **Lexend**: Modern, designed for readability
- **Lora**: Elegant serif for long-form content
- **Source Sans 3**: Professional, highly legible

To add custom fonts, update `src/app/layout.tsx` with `next/font`.

---

## ✅ Checklist for New Blog Posts

When creating a new blog post component:

- [ ] Import helper functions from `@/styles/blog-typography`
- [ ] Import `useBlogTheme` hook
- [ ] Use `getHeadingClasses()` for H2/H3
- [ ] Use `getBodyClasses()` for paragraphs/lists
- [ ] Use `getLinkClasses()` for links
- [ ] Test in both light and dark modes
- [ ] Verify responsive sizing on mobile/tablet/desktop

---

## 🚀 Benefits of This System

1. **Consistency**: All blogs use the same typography
2. **Maintainability**: Update once, applies everywhere
3. **Reusability**: Import and use in any component
4. **Type Safety**: TypeScript ensures correct usage
5. **Theme Support**: Automatic light/dark mode handling
6. **Performance**: Optimized font stack for fast loading

---

## 📚 Example: Complete Blog Component

```tsx
"use client";

import { useBlogTheme } from '@/components/BlogThemeProvider';
import { getHeadingClasses, getBodyClasses, getLinkClasses } from '@/styles/blog-typography';

export default function MyNewBlogPost() {
  const { theme } = useBlogTheme();
  
  return (
    <article className="max-w-4xl mx-auto px-4 py-8">
      {/* Main Title */}
      <h1 className={getHeadingClasses('h1', theme)}>
        My Awesome Blog Post
      </h1>
      
      {/* Section */}
      <h2 className={getHeadingClasses('h2', theme)}>
        Introduction
      </h2>
      
      <p className={getBodyClasses('paragraph', theme)}>
        This is a paragraph with optimized typography. It uses system fonts
        for fast loading and great readability.
      </p>
      
      {/* Subsection */}
      <h3 className={getHeadingClasses('h3', theme)}>
        Key Points
      </h3>
      
      <ul className={getBodyClasses('list', theme)}>
        <li>First point</li>
        <li>Second point</li>
        <li>Third point</li>
      </ul>
      
      {/* Link */}
      <p className={getBodyClasses('paragraph', theme)}>
        <a href="/learn-more" className={getLinkClasses(theme)}>
          Learn more about our approach
        </a>
      </p>
    </article>
  );
}
```

---

## 🎯 Quick Reference

**Import:**
```typescript
import { getHeadingClasses, getBodyClasses, getLinkClasses } from '@/styles/blog-typography';
import { useBlogTheme } from '@/components/BlogThemeProvider';
```

**Usage:**
```tsx
const { theme } = useBlogTheme();

<h2 className={getHeadingClasses('h2', theme)}>Title</h2>
<h3 className={getHeadingClasses('h3', theme)}>Subtitle</h3>
<p className={getBodyClasses('paragraph', theme)}>Text</p>
<ul className={getBodyClasses('list', theme)}>...</ul>
<a className={getLinkClasses(theme)}>Link</a>
```

---

**Need help?** Check `src/app/blog/[slug]/BlogPostClient.tsx` for a complete working example!
