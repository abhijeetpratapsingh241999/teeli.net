This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

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

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

---

## 📁 Blog Images Structure (Keyword-Based)

All blog images are organized by **main keyword categories** for better scalability and reusability.

### Directory Structure

```
/public/
  ├── blog-images/
  │   └── 3d-render/              👈 Main keyword folder (current 11 blogs)
  │       ├── hero/               (Hero images for blog posts - 1920×1080)
  │       ├── thumbnails/         (Blog card thumbnails - 800×600, 4:3 ratio)
  │       ├── workflow/           (Process diagrams, step-by-step images)
  │       ├── tools/              (Software screenshots, UI demos)
  │       └── examples/           (Case studies, before/after, galleries)
  │
  └── illustrations/
      └── 3d-render/              👈 Reusable SVG illustrations
          ├── workflow-pipeline.svg
          ├── rendering-process.svg
          └── use-cases-infographic.svg
```

### Image Path Format

**WebP Images:**
```
/blog-images/{keyword-category}/{type}/{filename}.webp
```

**Thumbnails (Blog Cards - 4:3 Ratio):**
```
/blog-images/{keyword-category}/thumbnails/{filename}.webp
```

**SVG Illustrations:**
```
/illustrations/{keyword-category}/{filename}.svg
```

### Image Specifications

| Type | Dimensions | Aspect Ratio | Format | Quality | File Size | Use Case |
|------|-----------|--------------|--------|---------|-----------|----------|
| **Thumbnails** | 800×600px | 4:3 | WebP | 80-85% | 50-70KB | Blog cards, listing pages |
| **Hero** | 1920×1080px | 16:9 | WebP | 85-90% | 150-250KB | Full blog post header |
| **Workflow** | 1200×800px | 3:2 | WebP | 80% | 70-120KB | Process diagrams, steps |
| **Tools** | 1400×900px | — | WebP | 80% | 80-150KB | Software screenshots |
| **Examples** | 1200×800px | 3:2 | WebP | 85% | 80-150KB | Case studies, galleries |
| **SVG** | Vector | — | SVG | — | 10-50KB | Reusable infographics |

### SEO Requirements for Thumbnails

**Critical for Google Image Search ranking:**

1. **Filename:** Use descriptive, keyword-rich names
   - ✅ `3d-rendering-house-complete-guide-2025.webp`
   - ❌ `img1.webp`, `thumbnail.webp`

2. **Alt Text:** 125-155 characters, descriptive
   ```json
   {
     "thumbnail": "/blog-images/3d-render/thumbnails/house-guide.webp",
     "thumbnailAlt": "Photorealistic 3D house rendering showing modern architectural visualization workflow"
   }
   ```

3. **Structured Data:** Automatically included in BlogPosting schema

4. **Optimization:** Vercel automatically provides:
   - Global CDN delivery (175+ locations) ✅ FREE
   - WebP conversion & compression
   - Responsive image sizing (srcset)
   - Lazy loading
   - Cache headers

### Example Paths

```
/blog-images/3d-render/thumbnails/3d-rendering-house-guide.webp
/blog-images/3d-render/hero/house-exterior.webp
/blog-images/3d-render/workflow/lighting-setup-hdri.webp
/blog-images/3d-render/tools/blender-interface-2025.webp
/blog-images/3d-render/examples/before-after-comparison.webp

/illustrations/3d-render/workflow-pipeline.svg
```

### Adding a New Keyword Category

When adding blogs for a new keyword (e.g., "architectural-design"):

1. **Create folder structure:**
```bash
mkdir -p public/blog-images/architectural-design/{hero,thumbnails,workflow,tools,examples}
mkdir -p public/illustrations/architectural-design
```

2. **Add `keywordCategory` to blog JSON:**
```json
{
  "id": 12,
  "slug": "new-blog-slug",
  "keywordCategory": "architectural-design",
  "title": "Blog Title"
}
```

3. **Use relative image paths in blog content:**
```markdown
![Alt text](image-name.webp)
```

The system automatically resolves to:
```
/blog-images/architectural-design/workflow/image-name.webp
```

### Benefits

✅ **Scalability**: Add 100+ blogs under same keyword without creating individual folders  
✅ **Reusability**: One image used across multiple blogs  
✅ **Performance**: Better CDN caching by keyword category  
✅ **SEO**: Keyword in image URL path  
✅ **Organization**: Clear separation by topic

### Current Keyword Categories

- `3d-render` - 11 blogs (3D rendering, visualization, modeling)
- *(Add more categories as needed)*


