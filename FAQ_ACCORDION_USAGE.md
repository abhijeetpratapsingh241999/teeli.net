# FAQ Accordion System - Usage Guide

## 📁 File Structure

```
src/
├── components/
│   └── FAQAccordion.tsx          # Reusable FAQ accordion component
├── data/
│   └── faq/
│       └── index.ts               # Central FAQ data exports
└── app/
    └── blog/
        └── [slug]/
            ├── page.tsx           # Blog page (server component)
            └── BlogPostClient.tsx # Blog client component
```

## 🎯 Component Features

### FAQAccordion Component
- ✅ Client-side React component (`"use client"`)
- ✅ State management for expand/collapse
- ✅ Lucide React icons (ChevronUp/ChevronDown)
- ✅ Smooth max-height animation
- ✅ Tailwind CSS styling
- ✅ Theme support (light/dark)
- ✅ Fully accessible (ARIA attributes)
- ✅ Responsive design (mobile/desktop)

## 📝 How to Use

### Step 1: Add FAQ Data

Edit `src/data/faq/index.ts`:

```typescript
export const faq_house_rendering: FAQItem[] = [
  {
    question: "What does 3D rendering mean in architecture?",
    answer: "It digitally converts 2D plans into realistic 3D visuals for better understanding."
  },
  {
    question: "How long does a 3D house render take?",
    answer: "Simple renders take 1–2 days; complex projects up to a week."
  },
  // Add more FAQ items...
];

// Add more FAQ lists for other blogs
export const faq_cloud_gpu: FAQItem[] = [
  {
    question: "What GPU do I need for deep learning?",
    answer: "For beginners learning ML, start with NVIDIA T4 or RTX 4070 Ti."
  }
];
```

### Step 2: Import in Blog Component

In your `BlogPostClient.tsx` or any client component:

```tsx
import FAQAccordion from '@/components/FAQAccordion';
import { faq_house_rendering } from '@/data/faq';

export default function BlogPostClient({ post }: { post: BlogPost }) {
  return (
    <div>
      {/* Your blog content */}
      
      {/* FAQ Section */}
      <FAQAccordion items={faq_house_rendering} />
    </div>
  );
}
```

### Step 3: Customize (Optional)

```tsx
<FAQAccordion 
  items={faq_house_rendering}
  title="People Also Ask"
  theme="dark"
/>
```

## 🎨 Props

```typescript
interface FAQAccordionProps {
  items: FAQItem[];           // Required: Array of Q&A
  title?: string;             // Optional: Section heading
  theme?: 'light' | 'dark';   // Optional: Color theme
}
```

## 🚀 Benefits

1. **Centralized Data**: All FAQ content in one place (`src/data/faq/index.ts`)
2. **Reusable Component**: Use same component across all blogs
3. **Type Safety**: TypeScript interfaces for FAQ items
4. **Easy Maintenance**: Update FAQ without touching component code
5. **SEO Optimized**: Proper heading structure (h2, h3)
6. **Accessible**: ARIA labels and keyboard navigation
7. **Performant**: Client-side only where needed

## 📦 Example: Complete Usage

```tsx
// src/data/faq/index.ts
export const faq_ai_rendering: FAQItem[] = [
  {
    question: "What is AI rendering?",
    answer: "AI rendering uses machine learning to accelerate 3D visualization."
  },
  {
    question: "Which AI tools are best?",
    answer: "D5 Render, NVIDIA Omniverse, and Stable Diffusion are popular choices."
  }
];

// src/app/blog/[slug]/BlogPostClient.tsx
import FAQAccordion from '@/components/FAQAccordion';
import { faq_ai_rendering } from '@/data/faq';

export default function BlogPostClient({ post, relatedPosts }: Props) {
  return (
    <article>
      {/* Content rendering... */}
      
      <FAQAccordion items={faq_ai_rendering} theme="dark" />
      
      {/* Related posts... */}
    </article>
  );
}
```

## ✅ Migration from Old System

If you had FAQ in markdown/JSON:

**Old Way:**
```json
{
  "content": "## FAQ\n\n**Question?**\nAnswer..."
}
```

**New Way:**
```typescript
// src/data/faq/index.ts
export const faq_topic_name: FAQItem[] = [
  { question: "Question?", answer: "Answer..." }
];

// In component
<FAQAccordion items={faq_topic_name} />
```

## 🎯 Next Steps

1. Fill FAQ data in `src/data/faq/index.ts` for each blog
2. Remove FAQ from markdown content (if applicable)
3. Import and use `<FAQAccordion />` in blog pages
4. Customize theme/title as needed

---

**Created**: January 2026  
**Component**: FAQAccordion.tsx  
**Data Source**: src/data/faq/index.ts
