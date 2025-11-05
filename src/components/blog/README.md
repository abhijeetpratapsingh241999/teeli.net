# Blog Components - Reusable & Consistent Styling

This directory contains reusable blog components that ensure consistent styling across all blog posts.

## 📁 Components

### `BlogHeadings.tsx`
Provides consistent heading styles for all blog posts.

#### Components Available:

1. **`<BlogH1>`** - Main blog title
2. **`<BlogH2>`** - Major sections (with gradient divider)
3. **`<BlogH3>`** - Sub-sections
4. **`<BlogListItem>`** - Bullet points & numbered lists
5. **`<BlogParagraph>`** - Body paragraphs

---

## 🎨 Design System

### Colors (Light Theme):
- **H1**: `text-gray-900` (Black)
- **H2**: `text-blue-900` (Very Dark Blue)
- **H3**: `text-blue-800` (Dark Blue)
- **Section Divider**: Blue to Indigo gradient
- **List Icons**: `text-blue-600`
- **Paragraphs**: `text-gray-800`

### Colors (Dark Theme):
- **H1**: `text-white`
- **H2**: `text-cyan-300`
- **H3**: `text-purple-300`
- **Section Divider**: Cyan to Purple gradient
- **List Icons**: `text-cyan-400`
- **Paragraphs**: `text-zinc-200`

---

## 📐 Typography Scale

### H1 (Main Title)
```
Mobile:   text-2xl (24px)
Tablet:   text-3xl (30px)
Desktop:  text-4xl (36px)
Large:    text-5xl (48px)
```

### H2 (Major Sections)
```
Mobile:   text-xl (20px)
Tablet:   text-2xl (24px)
Desktop:  text-3xl (30px)
Large:    text-4xl (36px)
```

### H3 (Sub-sections)
```
Mobile:   text-lg (18px)
Tablet:   text-xl (20px)
Desktop:  text-2xl (24px)
Large:    text-3xl (30px)
```

### Body Text & Lists
```
Mobile:   text-base (16px)
Tablet:   text-lg (18px)
Desktop:  text-xl (20px)
```

---

## 🔧 Usage Examples

### Import Components
```tsx
import { 
  BlogH1, 
  BlogH2, 
  BlogH3, 
  BlogListItem, 
  BlogParagraph 
} from '@/components/blog/BlogHeadings';
```

### H1 - Main Title
```tsx
<BlogH1 theme={theme}>
  What Is 3D Rendering?
</BlogH1>
```

### H2 - Major Section (with divider)
```tsx
<BlogH2 theme={theme}>
  Understanding the Process
</BlogH2>
```

### H3 - Sub-section
```tsx
<BlogH3 theme={theme}>
  Key Benefits
</BlogH3>
```

### Bullet List Item
```tsx
<BlogListItem theme={theme} type="bullet">
  Faster decision-making
</BlogListItem>
```

### Numbered List Item
```tsx
<BlogListItem theme={theme} type="number" number="1">
  Import 2D drawings into software
</BlogListItem>
```

### Paragraph
```tsx
<BlogParagraph theme={theme}>
  This is body text content.
</BlogParagraph>
```

---

## ✨ Features

### H2 Section Dividers
- Gradient line above each H2
- Width: `w-16` (mobile) → `w-20` (desktop)
- Height: `h-0.5` (mobile) → `h-1` (desktop)
- Creates clear visual separation

### Custom List Icons
**Bullet Points:**
- SVG checkmark circle icon
- Consistent with theme colors
- Size: `w-5 h-5` → `w-6 h-6`

**Numbered Lists:**
- Rounded badge with number
- Background color + border
- Size: `w-6 h-6` → `w-7 h-7`

### Responsive Spacing
All components use progressive spacing:
- Mobile: smaller margins
- Tablet: medium margins
- Desktop: larger margins

---

## 🎯 Benefits

✅ **Consistency** - All blogs look uniform  
✅ **Maintainability** - Update styles in one place  
✅ **Reusability** - Use across all blog posts  
✅ **Theme Support** - Automatic light/dark mode  
✅ **Responsive** - Mobile-first design  
✅ **Professional** - Premium visual hierarchy  

---

## 📝 Integration

These components are already integrated in:
- `src/app/blog/[slug]/BlogPostClient.tsx`

To use in new blog templates:
1. Import the components
2. Replace inline heading/list HTML
3. Pass `theme` prop from parent
4. Enjoy consistent styling! 🎉

---

## 🔄 Future Updates

Any changes to blog styling should be made in:
- `src/components/blog/BlogHeadings.tsx`

This ensures all blogs automatically get updated styling.

---

**Created:** November 6, 2025  
**Purpose:** Maintain consistent blog post styling across TEELI.NET platform
