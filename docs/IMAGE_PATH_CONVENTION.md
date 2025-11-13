# Blog Image Path Convention (Updated Nov 2025)

## 📁 Current Structure

All blog content images are now stored in the **`/public/blog/` folder** for simplicity and performance.

```
/public/
  └── blog/
      ├── image-name.webp          # Content images
      ├── diagram.svg               # SVG illustrations
      ├── hero-video.mp4            # Hero videos
      └── hero-thumbnail.webp       # Hero thumbnails

  └── blog-images/
      └── {category}/
          └── thumbnails/
              └── card-thumbnail.webp  # Blog card thumbnails (4:3 ratio, 800×600px)
```

---

## ✍️ Usage in Blog JSON Files

### Content Images (Markdown)

Use **simple filenames** (no paths):

```json
{
  "content": "![Alt text](image-name.webp)\n\n![Diagram](workflow-diagram.svg)"
}
```

**Auto-resolves to:**
- `image-name.webp` → `/blog/image-name.webp`
- `workflow-diagram.svg` → `/blog/workflow-diagram.svg`

### Thumbnails (Blog Cards)

Use **absolute paths**:

```json
{
  "thumbnail": "/blog-images/3d-render/thumbnails/blog-card-thumb.webp",
  "thumbnailAlt": "SEO alt text for thumbnail"
}
```

### Hero Images/Videos

```json
{
  "image": "/blog/hero-image.webp",
  "heroVideo": "/blog/hero-video.mp4",
  "videoMetadata": {
    "thumbnailUrl": "/blog/hero-image.webp"
  }
}
```

### External Images

```json
{
  "content": "![Alt](https://example.com/image.jpg)"
}
```

---

## 🔧 Path Resolution Logic

Implemented in `src/app/blog/[slug]/BlogPostClient.tsx`:

```typescript
if (src.startsWith('http://') || src.startsWith('https://')) {
  imageSrc = src; // External URLs unchanged
} else if (src.startsWith('/')) {
  imageSrc = src; // Absolute paths unchanged
} else {
  imageSrc = `/blog/${src}`; // Relative → /blog/ prefix
}
```

---

## 📊 Image Specifications

| Type | Size | Format | Location | Ratio |
|------|------|--------|----------|-------|
| **Content Images** | 1200×800px | WebP 80% | `/public/blog/` | 3:2 |
| **SVG Diagrams** | Vector | SVG | `/public/blog/` | Varies |
| **Hero Images** | 1920×1080px | WebP 85% | `/public/blog/` | 16:9 |
| **Hero Videos** | 1920×1080px | MP4 | `/public/blog/` | 16:9 |
| **Card Thumbnails** | 800×600px | WebP 85% | `/public/blog-images/{category}/thumbnails/` | 4:3 |

---

## ✅ Migration Checklist

When adding a new blog:

1. ✅ Place content images in `/public/blog/`
2. ✅ Use simple filenames in JSON markdown: `![Alt](filename.webp)`
3. ✅ Place card thumbnail in `/public/blog-images/{category}/thumbnails/`
4. ✅ Use absolute path for thumbnail: `/blog-images/{category}/thumbnails/...`
5. ✅ Test image display in browser before deployment

---

## 🔄 Legacy System (Deprecated)

**Old Structure:**
```
/public/blog-images/{category}/{type}/{filename}.webp
```

**Old Function:**
- `resolveImagePaths()` in `src/lib/image-utils.ts` (no longer used)

**Migration:**
- Simple filenames now resolve to `/blog/` instead of `/blog-images/{category}/workflow/`
- Legacy functions kept for backward compatibility but not used

---

## 📝 Examples

### ✅ Correct Usage

```json
{
  "slug": "my-blog-post",
  "keywordCategory": "3d-render",
  "thumbnail": "/blog-images/3d-render/thumbnails/my-blog-card.webp",
  "image": "/blog/my-blog-hero.webp",
  "content": "# Title\n\n![Example render](render-example.webp)\n\n![Workflow](workflow-diagram.svg)"
}
```

**Results:**
- `render-example.webp` → `/blog/render-example.webp` ✅
- `workflow-diagram.svg` → `/blog/workflow-diagram.svg` ✅
- Thumbnail → `/blog-images/3d-render/thumbnails/my-blog-card.webp` ✅

### ❌ Common Mistakes

```json
// ❌ Don't use /blog-images/ paths in content
"content": "![Alt](/blog-images/3d-render/workflow/image.webp)"

// ❌ Don't use category subfolders
"content": "![Alt](3d-render/workflow/image.webp)"

// ✅ Use simple filenames instead
"content": "![Alt](image.webp)"
```

---

## 🚨 Troubleshooting

### Image not displaying?

1. **Check file exists:** `/public/blog/{filename}`
2. **Check filename in JSON:** Must be simple filename (no paths)
3. **Clear cache:** Delete `.next/` folder and restart dev server
4. **Hard refresh:** Ctrl+Shift+F5 in browser

### 404 errors in console?

```
GET /blog//blog-images/... 404
```
- Means old `resolveImagePaths()` function was used
- Should be disabled in BlogPostClient.tsx line ~103

---

## 📅 Version History

- **Nov 12, 2025**: Migrated to `/blog/` folder structure, disabled `resolveImagePaths()`
- **Oct 2024**: Initial keyword-based `/blog-images/{category}/{type}/` structure
