# Video SEO System - Complete Guide

## Overview

The blog system now includes **automatic video detection and Schema.org VideoObject generation**. This system is fully reusable and requires no manual coding per blog post.

---

## How It Works

### 1. **Automatic Video Detection**

The system scans blog post markdown content for these patterns:

#### Pattern 1: Hosted Videos (Markdown)
```markdown
![Video Title](video.mp4)
![Demo](showcase.webm)
![Tutorial](example.mov)
```

#### Pattern 2: HTML Video Tags
```markdown
<video src="demo.mp4" poster="thumbnail.jpg" data-duration="180">
```

#### Pattern 3: YouTube URLs
```markdown
https://www.youtube.com/watch?v=dQw4w9WgXcQ
https://youtu.be/dQw4w9WgXcQ
```

#### Pattern 4: Vimeo URLs
```markdown
https://vimeo.com/123456789
```

---

## Features

### ✅ Automatic Schema.org VideoObject Generation

Videos detected in blog content automatically generate rich snippets:

```json
{
  "@type": "VideoObject",
  "name": "Blog Title - Video 1",
  "description": "Post excerpt or first 160 characters",
  "thumbnailUrl": "video.thumbnailUrl → post.image → logo fallback",
  "contentUrl": "video URL",
  "embedUrl": "embed URL for YouTube/Vimeo",
  "uploadDate": "post.date",
  "duration": "PT3M (ISO 8601)",
  "publisher": {
    "@type": "Organization",
    "name": "TEELI.NET",
    "logo": "teeli-logo.png"
  }
}
```

### ✅ VideoPlayer Component

Renders videos with:
- YouTube/Vimeo iframe embeds (automatic URL conversion)
- Native HTML5 video player for hosted files (MP4, WebM, MOV)
- Responsive 16:9 aspect ratio
- Theme-aware styling (cyan border, shadow, rounded corners)
- Video controls enabled
- Poster/thumbnail support
- autoPlay support with error handling

---

## Usage in Blog Posts

### Example 1: Hosted Video
```json
{
  "slug": "my-article",
  "title": "My Article",
  "content": "# Introduction\n\nCheck out this demo:\n\n![Demo Video](demo-video.mp4)\n\nMore content..."
}
```

**Result:**
- VideoPlayer renders with native HTML5 player
- Schema.org VideoObject auto-generated
- Thumbnail: uses `post.image` as fallback

### Example 2: YouTube Video
```json
{
  "content": "Watch this tutorial:\n\nhttps://www.youtube.com/watch?v=VIDEO_ID\n\nContinue reading..."
}
```

**Result:**
- VideoPlayer renders YouTube iframe
- Schema includes `embedUrl` for YouTube
- Thumbnail auto-extracted from YouTube

### Example 3: HTML5 Video with Metadata
```json
{
  "content": "<video src=\"/blog/tutorial.mp4\" poster=\"/blog/thumb.jpg\" data-duration=\"180\">\n\nExplanation..."
}
```

**Result:**
- Full metadata preserved (poster, duration)
- Schema includes accurate duration (PT3M)
- VideoPlayer uses poster as thumbnail

---

## Files Modified

### Core Components

**1. `src/lib/extract-video.ts`** *(NEW)*
- Pattern detection for all video types
- YouTube/Vimeo ID extraction
- Duration parsing (seconds → ISO 8601)
- Functions: `extractVideosFromContent()`, `hasVideo()`, `getPrimaryVideo()`

**2. `src/lib/seo-schema.ts`** *(UPDATED)*
- Added `generateContentVideoSchemas()` function
- Auto-detects videos from `post.content`
- Integrated into `generateAllSchemas()` pipeline
- Thumbnail fallback chain: `video → post.image → logo`

**3. `src/components/blog-ui/VideoPlayer.tsx`** *(NEW)*
- Reusable video player component
- Props: `src`, `poster`, `title`, `autoPlay`, `loop`, `muted`
- YouTube/Vimeo iframe conversion
- Native HTML5 video for hosted files
- Theme-aware styling

**4. `src/app/blog/[slug]/BlogPostClient.tsx`** *(UPDATED)*
- Integrated VideoPlayer for video rendering
- Detects video files in markdown: `![](video.mp4)`
- Detects YouTube/Vimeo URLs
- Replaces basic `<video>` tags with VideoPlayer

---

## Schema Generation Flow

```
Blog Post Content
      ↓
extractVideosFromContent() → VideoInfo[]
      ↓
generateContentVideoSchemas() → VideoObject[]
      ↓
generateAllSchemas() → Complete JSON-LD
      ↓
<script type="application/ld+json"> in page <head>
```

---

## Validation

### Check Schema in Page Source

1. Build project: `npm run build`
2. Navigate to blog post: `/blog/[slug]`
3. View page source (Ctrl+U)
4. Search for: `"@type": "VideoObject"`

### Google Rich Results Test

1. Copy page URL
2. Visit: https://search.google.com/test/rich-results
3. Paste URL and test
4. Verify VideoObject schema is valid

---

## Fallback Logic

| Field | Priority 1 | Priority 2 | Priority 3 |
|-------|-----------|-----------|-----------|
| **thumbnailUrl** | `video.thumbnailUrl` | `post.image` | `teeli-logo.png` |
| **duration** | `video.duration` | `"PT3M"` (default) | — |
| **description** | `post.excerpt` | First 160 chars | `post.title` |
| **embedUrl** | YouTube/Vimeo embed URL | `video.url` | — |

---

## Performance

- **Build Time**: No impact (static generation)
- **Runtime**: VideoPlayer uses lazy loading
- **SEO**: Instant rich snippets in Google Search
- **Analytics**: trackEvent('video_play') support ready

---

## Future Enhancements

- [ ] Video analytics tracking (play, pause, complete)
- [ ] Automatic YouTube thumbnail fetching via API
- [ ] Video duration auto-detection for hosted files
- [ ] Transcript/caption support for accessibility
- [ ] Video sitemap generation (video-sitemap.xml)

---

## Troubleshooting

### Videos Not Rendering

**Issue**: VideoPlayer not showing  
**Check**:
1. Verify video file exists in `public/blog/`
2. Check markdown syntax: `![alt](video.mp4)`
3. Inspect browser console for errors

### Schema Not Generating

**Issue**: No VideoObject in page source  
**Check**:
1. Run build: `npm run build`
2. Verify video pattern matches (see patterns above)
3. Check `extractVideosFromContent()` detects video
4. Inspect generateAllSchemas() output

### YouTube/Vimeo Not Embedding

**Issue**: Iframe not loading  
**Check**:
1. Verify URL format (watch, embed, youtu.be)
2. Check iframe sandbox permissions
3. Test direct embed URL in browser

---

## Support

For issues or feature requests, contact TEELI Team at info@teeli.net

Last Updated: January 15, 2025
