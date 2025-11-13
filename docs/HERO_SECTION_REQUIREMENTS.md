# Hero Section Requirements - 3D Building Designer Blog

## 📋 Overview
Blog: **3D Building Designer — Skills, Tools, Workflow & Career Growth (2025 Edition)**

---

## 🎯 Required Files

### 1️⃣ Hero Image (Static Poster/Thumbnail)

**Filename:** `3d-building-designer-hero.webp`

**Path:** `E:\startup\teeli.net - Copy motion - Copy\public\blog\`

**Technical Specs:**
- **Resolution:** 1920×1080px (16:9 aspect ratio)
- **Format:** WebP (lossy compression)
- **Quality:** 80-85%
- **File Size:** 200-400 KB
- **Color Space:** sRGB
- **Purpose:** Video poster frame + fallback if video fails to load

**Content Recommendations:**
- ✅ **Subject:** Photorealistic 3D architectural render
- ✅ **Style:** Modern architecture (glass facade, dramatic lighting)
- ✅ **Options:**
  - Modern office building at golden hour
  - Luxury residential interior with floor-to-ceiling windows
  - Contemporary mixed-use development render
- ✅ **Composition:** Rule of thirds, clear focal point
- ✅ **Text Space:** Leave left 30% or bottom third clear for title overlay
- ✅ **Colors:** Professional blues, grays, warm sunset/interior lighting
- ✅ **Mood:** Professional, aspirational, high-end

---

### 2️⃣ Hero Video (Autoplay Background Loop)

**Filename:** `3d-building-render-timelapse.mp4`

**Path:** `E:\startup\teeli.net - Copy motion - Copy\public\blog\`

**Technical Specs:**
- **Resolution:** 1920×1080px (Full HD)
- **Format:** MP4 (H.264 codec, High profile)
- **Duration:** 20-30 seconds
- **FPS:** 30fps
- **Bitrate:** 3-5 Mbps (VBR - Variable Bitrate)
- **File Size:** 5-10 MB maximum
- **Audio:** NO AUDIO (muted/silent)
- **Loop:** Must be seamless (first and last frame should match)
- **Purpose:** Engaging animated background for hero section

**Content Recommendations:**

**Concept:** Time-lapse of 3D building render creation process

**Sequence Breakdown:**
1. **0-5 seconds:** Start with wireframe mesh (blue/white lines)
2. **5-10 seconds:** Materials/textures applied (surfaces get realistic)
3. **10-15 seconds:** Lighting setup (HDRI sky + area lights appear)
4. **15-25 seconds:** Progressive rendering refinement (noise reduces)
5. **25-30 seconds:** Final photorealistic result (hold on beauty shot)

**Camera Movement:**
- ✅ Slow orbit around building (360° or 180°)
- ✅ OR: Smooth dolly push-in to feature detail
- ✅ Movement speed: Gentle, professional (not jarring)

**Pacing:**
- ✅ Smooth transitions between stages
- ✅ Not too fast (viewers should see each stage)
- ✅ Seamless loop back to start

---

## 🎬 Video Export Settings

### After Effects
```
Composition Settings:
- Resolution: 1920×1080
- Frame Rate: 30fps
- Duration: 25-30 seconds

Export Settings (H.264):
- Format: H.264
- Preset: High Quality
- Bitrate: 4 Mbps (VBR, 1 pass)
- Audio: Disabled/Remove
```

### Premiere Pro
```
Export Settings:
- Format: H.264
- Preset: YouTube 1080p HD
- Profile: High
- Level: 4.2
- Bitrate: VBR 1 pass, Target 4 Mbps
- Audio Track: Disable
- Frame Rate: 30fps
```

### DaVinci Resolve
```
Deliver Page:
- Format: MP4
- Codec: H.264
- Resolution: 1920×1080
- Frame Rate: 30fps
- Quality: Restrict to 4 Mbps
- Audio: Remove/Disable track
```

### Blender
```
Output Properties:
- Format: FFmpeg video
- Container: MPEG-4
- Video Codec: H.264
- Output Quality: High
- Encoding Speed: Good
- Bitrate: 4000 kbps (constant)
- Audio Codec: None
- Frame Rate: 30fps
```

---

## 🖼️ Image Creation Tools

### Option 1: Screen Capture from 3D Software
1. Open your best building render in V-Ray, Blender, or 3ds Max
2. Set viewport to 1920×1080
3. Screenshot final render
4. Edit in Photoshop (adjust levels, crop, add subtle vignette)
5. Export as WebP (80-85% quality)

### Option 2: Stock/Reference Images
1. Find high-quality architectural visualization on:
   - ArtStation.com
   - Behance.net
   - CGTrader.com
2. License/purchase appropriate image
3. Resize to 1920×1080
4. Export as WebP

### Option 3: AI Generation (Quick Mock)
1. Use Midjourney/DALL-E/Stable Diffusion
2. Prompt: "photorealistic architectural visualization of modern glass office building at sunset, dramatic lighting, professional render, 16:9 aspect ratio"
3. Upscale to 1920×1080
4. Export as WebP

---

## 🔧 SVG Issue Resolution

### Current Problem
- File `3d-building-designer-workflow.svg` exists but not displaying in browser
- Likely causes: Browser cache, Next.js image optimization, MIME type issues

### Solution Options

#### Option 1: Convert SVG to WebP (RECOMMENDED)
1. Visit: https://cloudconvert.com/svg-to-webp
2. Upload: `3d-building-designer-workflow.svg`
3. Convert at: 1200×800px (or larger)
4. Download as: `3d-building-designer-workflow.webp`
5. Upload to: `/public/blog/`
6. Update JSON: Change `.svg` to `.webp` in markdown

#### Option 2: Test SVG Directly
1. Visit: http://localhost:3000/blog/3d-building-designer-workflow.svg
2. If it loads → issue is in component rendering
3. If it fails → MIME type or server configuration issue

#### Option 3: Clear Cache
1. Browser: Ctrl+Shift+F5 (hard refresh)
2. Next.js: Delete `.next` folder, restart dev server
3. Test again in incognito/private window

---

## 📊 Current Status

| Asset | Filename | Status |
|-------|----------|--------|
| Content Image 1 | `3d-building-tools.webp` | ✅ Uploaded |
| Content Image 2 | `3d-designer-career-path.webp` | ✅ Uploaded |
| Content Image 3 | `3d-building-designer-workflow.svg` | ⚠️ Exists but not displaying |
| Hero Image | `3d-building-designer-hero.webp` | ❌ Missing |
| Hero Video | `3d-building-render-timelapse.mp4` | ❌ Missing |

---

## ✅ Next Actions

### Priority 1: Fix SVG Display
- [ ] Convert `3d-building-designer-workflow.svg` to WebP
- [ ] Upload as `3d-building-designer-workflow.webp`
- [ ] Update JSON markdown to use `.webp` extension

### Priority 2: Create Hero Image
- [ ] Design/capture 1920×1080 building render
- [ ] Export as WebP (80-85% quality)
- [ ] Save as `3d-building-designer-hero.webp`
- [ ] Upload to `/public/blog/`

### Priority 3: Create Hero Video
- [ ] Create 25-30 second time-lapse sequence
- [ ] Export as MP4 (H.264, 30fps, 4 Mbps)
- [ ] Ensure seamless loop
- [ ] Save as `3d-building-render-timelapse.mp4`
- [ ] Upload to `/public/blog/`

---

## 🎨 Design Inspiration

**Hero Image Examples:**
- Zaha Hadid Architects portfolio renders
- BIG (Bjarke Ingels Group) visualization style
- MIR (rendering studio) architectural renders
- Foster + Partners CGI imagery

**Hero Video Examples:**
- Blender time-lapse renders on YouTube
- Architectural visualization process videos
- "Making of" 3D building renders
- Progressive rendering demonstrations

---

## 📝 Notes

- **Browser Compatibility:** WebP supported in all modern browsers (Chrome, Firefox, Edge, Safari 14+)
- **Video Fallback:** Hero image automatically used if video fails to load
- **Mobile Optimization:** Video may not autoplay on mobile; image fallback ensures good UX
- **SEO:** Alt text already optimized for both content images
- **Performance:** WebP format chosen for 30-40% smaller file size vs PNG/JPG

---

**Created:** November 12, 2025  
**Blog:** 3D Building Designer — Skills, Tools, Workflow & Career Growth (2025)  
**Status:** Awaiting hero image/video creation
