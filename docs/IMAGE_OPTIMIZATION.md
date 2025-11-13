# Image Optimization Guide for Blog Posts

This project has **2 permanent image optimization systems** that work for all current and future blog posts.

---

## 🚀 Quick Start

### For New Blog Posts:
```bash
# Step 1: Add your images to public/blog/
# Step 2: Run optimization
npm run optimize:images

# Done! All JPG/PNG files automatically converted to WebP + AVIF
```

---

## 📦 Available Scripts

### 1. **Bulk Image Optimizer** (Recommended)

**Command:**
```bash
npm run optimize:images
```

**What it does:**
- Scans entire `public/blog/` directory
- Converts all JPG/PNG images to:
  - **WebP** (85% quality) - Best for modern browsers
  - **AVIF** (80% quality) - Best compression for new browsers
- Preserves original dimensions (no upscaling)
- Shows before/after size comparison
- **Automatically skips already optimized files**

**When to use:**
- After adding new blog images
- When you want to optimize all images at once
- For bulk processing

**Example output:**
```
📸 Processing: my-image.jpg (500.00 KB)
  ✅ WebP: 150.00 KB (70% smaller)
  ✅ AVIF: 120.00 KB (76% smaller)
```

---

### 2. **Single File Compressor** (For Fine-tuning)

**Command:**
```bash
node scripts/compress-webp.mjs <file-path> [quality]
```

**What it does:**
- Re-compresses existing WebP files
- Custom quality control (default: 75%)
- Creates automatic backup (.webp.backup)
- Shows compression savings

**When to use:**
- When WebP is still too large (>300 KB)
- To fine-tune compression quality
- To reduce specific file sizes

**Examples:**
```bash
# Compress with default 75% quality
node scripts/compress-webp.mjs public/blog/floor-plan-3dview.webp

# Compress with custom 60% quality (more compression)
node scripts/compress-webp.mjs public/blog/large-image.webp 60

# Compress with 85% quality (less compression, better quality)
node scripts/compress-webp.mjs public/blog/hero-image.webp 85
```

**Quality guidelines:**
- **85-90%**: Minimal compression, best quality (hero images)
- **75-80%**: Balanced (default, recommended)
- **60-70%**: High compression (backgrounds, thumbnails)
- **50-60%**: Maximum compression (may show artifacts)

---

## 🎯 Recommended Workflow for New Blogs

### Option A: Simple (Automatic)
```bash
# 1. Add images to public/blog/
# 2. Run optimizer
npm run optimize:images

# 3. Check sizes - if any WebP > 300 KB, re-compress:
node scripts/compress-webp.mjs public/blog/large-file.webp 75
```

### Option B: Advanced (Custom Quality)
```bash
# 1. Add images to public/blog/
# 2. Optimize with bulk tool
npm run optimize:images

# 3. Fine-tune specific images
node scripts/compress-webp.mjs public/blog/hero.webp 85  # High quality
node scripts/compress-webp.mjs public/blog/thumb.webp 70 # High compression
```

---

## 📊 Performance Targets

### Recommended File Sizes:
- **Hero images**: < 200 KB
- **Content images**: < 150 KB
- **Thumbnails**: < 100 KB
- **Icons/Diagrams**: < 50 KB (use SVG when possible)

### Total Page Weight:
- **Excellent**: < 500 KB
- **Good**: 500-1000 KB
- **Acceptable**: 1000-1500 KB
- **Needs Optimization**: > 1500 KB

---

## 🔧 Technical Details

### Bulk Optimizer (`optimize-images.mjs`)
- **Location**: `scripts/optimize-images.mjs`
- **Input formats**: `.jpg`, `.jpeg`, `.png`
- **Output formats**: `.webp`, `.avif`
- **WebP quality**: 85%
- **AVIF quality**: 80%
- **Resize**: No upscaling, preserves original dimensions
- **Backup**: Keeps original files

### Single Compressor (`compress-webp.mjs`)
- **Location**: `scripts/compress-webp.mjs`
- **Input format**: `.webp` only
- **Output format**: `.webp` (compressed)
- **Default quality**: 75%
- **Effort level**: 6 (higher = better compression)
- **Backup**: Auto-creates `.webp.backup`

---

## 💡 Pro Tips

1. **Always run optimizer after adding images** - It's automatic and fast
2. **Use SVG for diagrams/charts** - They're smaller and scale infinitely
3. **Keep backups** - Both scripts create backups automatically
4. **Check file sizes** - Aim for <300 KB per image
5. **Test visual quality** - If compression looks bad, increase quality %
6. **Compress before commit** - Reduces repo size

---

## 🛠️ Troubleshooting

### Script fails with "module not found"
```bash
npm install sharp --save-dev
```

### Image quality too low
```bash
# Increase quality percentage (default 75%)
node scripts/compress-webp.mjs public/blog/image.webp 85
```

### File is locked/permission error
- Close any programs viewing the image
- Restart terminal
- Run script again

### Want to restore original
```bash
# Backup is saved as: image.webp.backup
cp public/blog/image.webp.backup public/blog/image.webp
```

---

## 📈 Example: Blog #8 Results

**Before optimization:**
- Total images: 498.65 KB
- Largest file: 471.28 KB (WebP)
- Score: 98/100

**After optimization:**
- Total images: 197.51 KB
- Largest file: 170.14 KB (WebP)
- Score: **100/100** ⭐
- **60.4% reduction in total size!**

---

## 🚀 Future Blogs - Quick Checklist

- [ ] Add images to `public/blog/`
- [ ] Run `npm run optimize:images`
- [ ] Check all images < 300 KB
- [ ] If needed, re-compress: `node scripts/compress-webp.mjs <file> 75`
- [ ] Verify visual quality
- [ ] Commit optimized images

---

## 📝 Notes

- Scripts work for **all future blogs automatically**
- No manual configuration needed per blog
- Optimization is **one-time per image**
- Scripts **skip already optimized files**
- **Safe to run multiple times**

---

**Happy optimizing! 🎉**
