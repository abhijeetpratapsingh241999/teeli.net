# FAQ Import Reference - Quick Guide

## 📋 Available FAQ Lists

All FAQ lists are exported from `src/data/faq/index.ts`

### ✅ Filled FAQ Lists (Ready to Use)

1. **`faq_house_rendering`** - 3D House Rendering (6 questions)
2. **`faq_cloud_gpu`** - Cloud GPU Computing (5 questions)
3. **`faq_cloud_computing`** - Cloud Computing (5 questions)
4. **`faq_3d_visualization`** - 3D Visualization (5 questions)
5. **`faq_ai_rendering`** - AI Rendering (5 questions)
6. **`faq_image_to_3d`** - Image to 3D Conversion (4 questions)
7. **`faq_digital_twins`** - Digital Twins AEC (4 questions)
8. **`faq_sustainable_rendering`** - Green/Sustainable Rendering (4 questions)
9. **`faq_generative_ai_architecture`** - Generative AI Architecture (4 questions)
10. **`faq_nerf_instant_3d`** - NeRF & Instant 3D (4 questions)
11. **`faq_quantum_design`** - Quantum Design/Future Tech (3 questions)

---

## 🚀 How to Use in Blog Posts

### Method 1: Direct Import in BlogPostClient.tsx

If you want to add FAQ to a specific blog, import and use it directly:

```tsx
// src/app/blog/[slug]/BlogPostClient.tsx
import FAQAccordion from '@/components/FAQAccordion';
import { 
  faq_house_rendering,
  faq_cloud_gpu,
  faq_3d_visualization 
} from '@/data/faq';

export default function BlogPostClient({ post, relatedPosts }: Props) {
  // Determine which FAQ to show based on blog slug or category
  let faqItems = [];
  
  if (post.slug.includes('house-rendering')) {
    faqItems = faq_house_rendering;
  } else if (post.slug.includes('cloud-gpu')) {
    faqItems = faq_cloud_gpu;
  } else if (post.slug.includes('3d-visualization')) {
    faqItems = faq_3d_visualization;
  }

  return (
    <article>
      {/* Your blog content */}
      
      {/* FAQ Section */}
      {faqItems.length > 0 && <FAQAccordion items={faqItems} />}
    </article>
  );
}
```

### Method 2: Map Slug to FAQ (Recommended)

Create a mapping object for cleaner code:

```tsx
import FAQAccordion from '@/components/FAQAccordion';
import * as FAQ from '@/data/faq';

const FAQ_MAP: Record<string, FAQ.FAQItem[]> = {
  '3d-rendering-house-process-benefits-costs-future-trends-2025': FAQ.faq_house_rendering,
  'cloud-gpu-complete-guide-2025': FAQ.faq_cloud_gpu,
  'cloud-computing-complete-guide-2025': FAQ.faq_cloud_computing,
  '3d-visualisation-complete-guide-2025': FAQ.faq_3d_visualization,
  'ai-rendering-trends': FAQ.faq_ai_rendering,
  'image-to-3d-platforms-rise': FAQ.faq_image_to_3d,
  'ai-digital-twins-aec-transformation': FAQ.faq_digital_twins,
  'green-render-revolution-sustainable': FAQ.faq_sustainable_rendering,
  'generative-ai-architectural-design': FAQ.faq_generative_ai_architecture,
  'instant-3d-nerf-revolution': FAQ.faq_nerf_instant_3d,
  'quantum-design-2028': FAQ.faq_quantum_design,
};

export default function BlogPostClient({ post, relatedPosts }: Props) {
  const faqItems = FAQ_MAP[post.slug] || [];

  return (
    <article>
      {/* Your blog content */}
      
      {faqItems.length > 0 && (
        <FAQAccordion 
          items={faqItems}
          theme={theme} // Pass current theme
        />
      )}
    </article>
  );
}
```

### Method 3: Category-Based FAQ

Use category instead of slug for broader matching:

```tsx
const FAQ_BY_CATEGORY: Record<string, FAQ.FAQItem[]> = {
  'Cloud Technology': FAQ.faq_cloud_gpu,
  'Architecture & Design': FAQ.faq_house_rendering,
  'Tech Trends': FAQ.faq_3d_visualization,
  'AI Technology': FAQ.faq_ai_rendering,
};

const faqItems = FAQ_BY_CATEGORY[post.category] || [];
```

---

## 📝 Blog-to-FAQ Mapping

| Blog Slug | FAQ Export | Status |
|-----------|-----------|--------|
| `3d-rendering-house-process-benefits-costs-future-trends-2025` | `faq_house_rendering` | ✅ |
| `cloud-gpu-complete-guide-2025` | `faq_cloud_gpu` | ✅ |
| `cloud-computing-complete-guide-2025` | `faq_cloud_computing` | ✅ |
| `3d-visualisation-complete-guide-2025` | `faq_3d_visualization` | ✅ |
| `ai-rendering-trends` | `faq_ai_rendering` | ✅ |
| `image-to-3d-platforms-rise` | `faq_image_to_3d` | ✅ |
| `ai-digital-twins-aec-transformation` | `faq_digital_twins` | ✅ |
| `green-render-revolution-sustainable` | `faq_sustainable_rendering` | ✅ |
| `generative-ai-architectural-design` | `faq_generative_ai_architecture` | ✅ |
| `instant-3d-nerf-revolution` | `faq_nerf_instant_3d` | ✅ |
| `quantum-design-2028` | `faq_quantum_design` | ✅ |

---

## 🎨 Customization Examples

### With Custom Title

```tsx
<FAQAccordion 
  items={faq_house_rendering}
  title="People Also Ask About 3D Rendering"
/>
```

### With Theme

```tsx
<FAQAccordion 
  items={faq_cloud_gpu}
  theme="dark"
/>
```

### Conditional Rendering

```tsx
{post.category === 'Cloud Technology' && (
  <FAQAccordion items={faq_cloud_gpu} />
)}
```

---

## 🔄 Adding New FAQs

To add FAQ for a new blog:

1. **Edit `src/data/faq/index.ts`**:
```typescript
export const faq_new_topic: FAQItem[] = [
  {
    question: "Your question?",
    answer: "Your answer."
  }
];
```

2. **Import and use**:
```tsx
import { faq_new_topic } from '@/data/faq';

<FAQAccordion items={faq_new_topic} />
```

---

## ✅ Next Steps

1. Choose your preferred method (slug mapping recommended)
2. Update `BlogPostClient.tsx` with FAQ logic
3. Test on multiple blog posts
4. Adjust theme/title as needed

**All FAQ data is ready to use!** 🎉
