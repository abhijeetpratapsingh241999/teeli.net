# 🚀 TEELI BLOG - QUICK START GUIDE

## 📝 New Blog in 5 Steps

### **Step 1: Create Images** 🖼️
```bash
# Hero Image
Filename: your-slug-hero.webp
Size: 1200x900 (4:3) or 1200x675 (16:9)
Quality: 80-85
Target: 20-50KB
Location: public/blog/

# Social Thumbnail
Filename: your-slug-social.webp
Size: 1200x630
Quality: 75-80
Target: 50-100KB
Location: public/blog/
```

### **Step 2: Copy JSON Template** 📄
```bash
# Copy existing blog
cp content/blog/3d-rendering-house-complete-guide.json content/blog/your-slug.json
```

### **Step 3: Update Required Fields** ✏️
```json
{
  "slug": "your-slug",
  "title": "Your Title — Subtitle (2025)",
  "metaTitle": "SEO Title 50-60 chars",
  "metaDescription": "Description 150-160 chars",
  "image": "/blog/your-slug-hero.webp",
  "imageAlt": "Detailed description",
  "thumbnail": "/blog/your-slug-social.webp",
  "content": "# Your Content..."
}
```

### **Step 4: Test Build** 🔨
```bash
npm run build
# Should complete with zero errors
```

### **Step 5: Deploy** 🚀
```bash
git add -A
git commit -m "feat: add blog - your-title"
git push origin main
```

---

## ✅ Quality Checklist

### **Before Deploy:**
- [ ] Hero image 20-50KB
- [ ] Filename includes `-hero.webp`
- [ ] metaTitle 50-60 chars
- [ ] metaDescription 150-160 chars
- [ ] Alt text detailed (100-150 chars)
- [ ] 3-6 FAQ questions
- [ ] 2-3 internal links
- [ ] Build successful

### **After Deploy:**
- [ ] PageSpeed test: 92+ score
- [ ] No 404 errors
- [ ] Images load correctly
- [ ] Schema.org valid

---

## 🎯 Performance Targets

| Metric | Target | Status |
|--------|--------|--------|
| Performance | 92-95 | ✅ |
| LCP | <3s | ✅ |
| Accessibility | 88+ | ✅ |
| SEO | 100 | ✅ |

---

## 🔧 Common Commands

```bash
# Build
npm run build

# Dev server
npm run dev

# Check image size
Get-Item public/blog/image.webp | Select-Object Length

# Optimize image (manual)
# Use https://squoosh.app/ or ImageOptim
```

---

## 📞 Quick Links

- Full Guide: `BLOG_SYSTEM_COMPLETE_GUIDE.md`
- PageSpeed: https://pagespeed.web.dev/
- Schema Test: https://validator.schema.org/
- JSON Lint: https://jsonlint.com/

---

**Last Updated:** Nov 15, 2025  
**System Status:** ✅ Production Ready
