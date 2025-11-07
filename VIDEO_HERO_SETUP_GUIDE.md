# Video Hero Setup Guide for Pillar Blogs

## 📹 Video Requirements

### File Specifications:
- **Format:** MP4 (H.264) or WebM (VP9)
- **Length:** 7-10 seconds
- **Resolution:** 1920x1080 (Full HD) or 1280x720 (HD)
- **File Size:** 300-800KB (compressed)
- **Frame Rate:** 30 FPS
- **Audio:** None (muted anyway)

---

## 📁 File Structure

Place your files in `public/blog/`:

```
public/blog/
├── 3d-product-rendering-hero.mp4         ← Video file
├── 3d-product-rendering-hero-poster.webp ← Poster image (required)
├── 3d-rendering-house-hero.mp4
└── 3d-rendering-house-hero-poster.webp
```

**Naming Convention:**
- Video: `[blog-name]-hero.mp4`
- Poster: `[blog-name]-hero-poster.webp`

---

## 🎨 Create Poster Image (from video)

### Option 1: Using FFmpeg
```bash
# Extract frame at 1 second
ffmpeg -i 3d-product-rendering-hero.mp4 -ss 00:00:01 -frames:v 1 poster.jpg

# Convert to WebP (compressed)
cwebp -q 85 poster.jpg -o 3d-product-rendering-hero-poster.webp
```

### Option 2: Using Online Tool
1. Go to: https://www.kapwing.com/tools/video-thumbnail-maker
2. Upload your video
3. Choose a frame
4. Download as WebP (or JPG, then convert)

### Poster Specs:
- **Format:** WebP (best) or JPG
- **Size:** 30-80KB
- **Resolution:** Same as video (1920x1080)
- **Quality:** 80-85%

---

## 🔧 Compress Video (if needed)

### Using FFmpeg:
```bash
# Compress to ~500KB
ffmpeg -i input.mp4 \
  -vcodec libx264 \
  -crf 28 \
  -preset slow \
  -vf "scale=1920:1080" \
  -movflags +faststart \
  -an \
  3d-product-rendering-hero.mp4
```

### Parameters Explained:
- `-crf 28`: Quality (18=best, 28=good, 32=smaller)
- `-preset slow`: Better compression (slower encode)
- `-an`: Remove audio
- `-movflags +faststart`: Web optimization

---

## 📝 Update Blog JSON

### For 3D Product Rendering Blog:

**Before:**
```json
{
  "image": "/blog/3d-product-rendering-hero.svg"
}
```

**After:**
```json
{
  "image": "/blog/3d-product-rendering-hero.mp4"
}
```

**That's it!** The system automatically:
- ✅ Detects `.mp4` extension
- ✅ Loads video with auto-play, muted, loop
- ✅ Shows poster during loading
- ✅ Adds Video Schema for SEO
- ✅ Falls back to poster if video fails

---

## 🎯 SEO Optimization (Automatic)

When you use video, the system automatically adds:

### Video Schema (JSON-LD)
```json
{
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "3D Product Rendering - Visual Demo",
  "description": "Visual demonstration of 3D product rendering workflow",
  "thumbnailUrl": "https://teeli.net/blog/3d-product-rendering-hero-poster.webp",
  "contentUrl": "https://teeli.net/blog/3d-product-rendering-hero.mp4",
  "uploadDate": "2026-01-10",
  "duration": "PT7S",
  "url": "https://teeli.net/blog/3d-product-rendering-process-tools-visualization-modern-industries-2025"
}
```

This helps Google:
- ✅ Index video in Video Search
- ✅ Show video thumbnail in SERPs
- ✅ Display video rich results
- ✅ Improve engagement metrics

---

## 🚀 Implementation Checklist

### For 3D Product Rendering Blog:

- [ ] Create/compress video (7-10 sec, <800KB)
- [ ] Extract poster frame from video
- [ ] Convert poster to WebP (<80KB)
- [ ] Upload both files to `public/blog/`:
  - `3d-product-rendering-hero.mp4`
  - `3d-product-rendering-hero-poster.webp`
- [ ] Update blog JSON: change `.svg` to `.mp4`
- [ ] Test on localhost
- [ ] Verify video auto-plays (muted)
- [ ] Check poster shows during load
- [ ] Validate Video Schema in Google Rich Results Test

### For 3D House Rendering Blog:

- [ ] Same steps as above
- [ ] Files:
  - `3d-rendering-house-hero.mp4`
  - `3d-rendering-house-hero-poster.webp`

---

## 📊 Performance Impact

### Before (SVG):
- File size: ~8KB
- Load time: <100ms
- LCP: Excellent

### After (Video):
- File size: ~500KB
- Load time: ~1-2 seconds
- LCP: Still Good (poster loads first)
- Engagement: ⬆️ 2-3x improvement

**Net Result:** Slight performance trade-off for massive engagement boost.

---

## 🔍 Testing

### Local Testing:
```bash
npm run dev
# Visit: http://localhost:3000/blog/3d-product-rendering-process-tools-visualization-modern-industries-2025
```

### Check:
1. ✅ Video auto-plays (no sound)
2. ✅ Video loops seamlessly
3. ✅ Poster shows during load
4. ✅ Mobile-friendly (works on phone)
5. ✅ No console errors

### SEO Validation:
1. Go to: https://search.google.com/test/rich-results
2. Enter blog URL
3. Verify "VideoObject" schema detected
4. Check for errors

---

## ⚠️ Important Notes

### DO:
✅ Keep video 7-10 seconds max
✅ Compress to <800KB
✅ Always include poster image
✅ Use .mp4 (best compatibility)
✅ Test on mobile devices

### DON'T:
❌ Use videos >2MB (too slow)
❌ Include audio (will be muted anyway)
❌ Use videos >15 seconds (too long)
❌ Forget poster image (bad UX)
❌ Use auto-play on cluster blogs (images only)

---

## 🎓 Example Commands

### Full Video Processing Pipeline:
```bash
# 1. Compress video
ffmpeg -i raw-video.mp4 -vcodec libx264 -crf 28 -preset slow -vf "scale=1920:1080" -movflags +faststart -an 3d-product-rendering-hero.mp4

# 2. Extract poster
ffmpeg -i 3d-product-rendering-hero.mp4 -ss 00:00:01 -frames:v 1 poster.jpg

# 3. Convert to WebP
cwebp -q 85 poster.jpg -o 3d-product-rendering-hero-poster.webp

# 4. Check file sizes
ls -lh 3d-product-rendering-hero.mp4
ls -lh 3d-product-rendering-hero-poster.webp
```

### Target Sizes:
- Video: 300-800KB ✅
- Poster: 30-80KB ✅

---

## 📞 Need Help?

If video not showing:
1. Check file exists in `public/blog/`
2. Check filename exactly matches JSON
3. Check poster file exists (auto-generated name)
4. Clear browser cache
5. Check console for errors

If video too large:
1. Increase CRF value (28 → 32)
2. Reduce resolution (1080p → 720p)
3. Shorten video length
4. Use WebM instead of MP4

---

## 🎉 Benefits Summary

### SEO Benefits:
- ✅ Video Schema → Rich results
- ✅ Video thumbnails in SERP
- ✅ Higher CTR (2-3x)
- ✅ Lower bounce rate
- ✅ Longer session duration

### User Benefits:
- ✅ Instant visual understanding
- ✅ Professional appearance
- ✅ Engaging micro-interaction
- ✅ Mobile-optimized
- ✅ Accessibility (poster fallback)

### Technical Benefits:
- ✅ Backward compatible
- ✅ Cluster blogs unaffected
- ✅ No breaking changes
- ✅ Automatic schema generation
- ✅ Performance optimized

---

**Ready to implement? Follow the checklist above!** 🚀
