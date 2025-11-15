# 🤖 AI AGENT INSTRUCTIONS - TEELI BLOG SYSTEM

## 🎯 For AI Assistants Working on TEELI Blogs

**Read this FIRST before helping with any blog-related task!**

---

## ⚡ System Status (Nov 2025)

✅ **PRODUCTION READY - DO NOT MODIFY CORE ARCHITECTURE**

**Current Performance:**
- Performance: 92-95 (Top 5% globally)
- All optimizations complete
- Industry standard compliance achieved
- Future-proof and stable

**CRITICAL:** Do not suggest further performance optimizations unless specifically requested. System is optimized to industry excellence.

---

## 🚫 What NOT to Change

### **Performance Architecture (LOCKED):**
1. ❌ Do NOT change `ResponsiveImage.tsx` hero detection logic
2. ❌ Do NOT add Next.js Image for hero images
3. ❌ Do NOT modify image preload in `page.tsx`
4. ❌ Do NOT change critical CSS inlining
5. ❌ Do NOT remove code splitting
6. ❌ Do NOT modify browserslist targets

### **Why These Are Locked:**
- ✅ Achieve 92-95 performance score
- ✅ LCP optimized (<3s)
- ✅ Industry best practices
- ✅ Tested and production-proven
- ✅ Future-proof architecture

**If user asks to "improve performance," first check current score. If 90+, advise NO changes needed.**

---

## ✅ What You CAN Help With

### **Content Tasks (Safe):**
1. ✅ Creating new blog JSON files
2. ✅ Writing blog content
3. ✅ Generating meta descriptions
4. ✅ Creating FAQ sections
5. ✅ Internal linking suggestions
6. ✅ SEO optimization (content-level)
7. ✅ Alt text writing
8. ✅ Image optimization advice

### **New Blog Workflow:**

```
User: "Create new blog about X"
You:
1. Ask for blog topic/title
2. Generate JSON using template
3. Create SEO meta tags (metaTitle, metaDescription)
4. Write alt text for images
5. Generate 3-6 FAQ questions
6. Suggest 2-3 related posts for internal linking
7. Provide image specs (1200x900, 20-50KB, WebP)
8. Test build command
```

---

## 📋 Required Fields Validation

When creating new blog JSON, **verify ALL these fields:**

```json
{
  "id": number,                    // Required: unique ID
  "slug": "kebab-case-slug",       // Required: URL-safe
  "keywordCategory": "3d-render",  // Required: category
  "title": "Full Title (2025)",    // Required: with year
  "metaTitle": "50-60 chars",      // Required: SEO title
  "metaDescription": "150-160",    // Required: SEO desc
  "category": "Category Name",     // Required
  "author": "TEELI Team",          // Required
  "authorRole": "Role",            // Required
  "date": "Jan 15, 2025",          // Required
  "readTime": "X min read",        // Required
  "image": "/blog/slug-hero.webp", // Required: hero
  "imageAlt": "Detailed alt",      // Required: SEO critical
  "thumbnail": "/blog/slug-social.webp", // Required: social
  "thumbnailAlt": "Social alt",    // Required
  "excerpt": "Brief excerpt",      // Required
  "content": "# Markdown",         // Required: full content
  "faq": [...],                    // Required: 3-6 items
  "relatedPosts": [...]            // Optional but recommended
}
```

**Missing ANY required field = BUILD FAILURE**

---

## 🎯 SEO Rules (Strict)

### **Meta Tags:**
```
metaTitle:
- Length: 50-60 characters STRICT
- Include main keyword
- Include year (2025)
- Natural, readable

metaDescription:
- Length: 150-160 characters STRICT
- Include main keyword + 1-2 secondary
- Call to action (optional)
- Natural, readable
```

### **Alt Text:**
```
imageAlt / thumbnailAlt:
- Length: 100-150 characters recommended
- Describe what's IN the image (literal)
- Add context (architectural/technical terms)
- Include year (2025) for freshness
- NO generic text like "image" or "photo"

Example:
❌ "3D rendering image"
✅ "Photorealistic 3D house rendering portfolio displaying modern residential architecture with detailed exterior materials natural lighting and landscaping visualization for architectural presentation 2025"
```

### **Internal Linking:**
```
Minimum: 2-3 internal links per blog
Format: [anchor text](/blog/slug)
Context: Natural, in-content placement
```

---

## 🖼️ Image Specifications

### **Hero Images (CRITICAL):**

**MUST include `-hero` in filename:**
```
Correct: ✅ /blog/your-slug-hero.webp
Wrong:   ❌ /blog/your-slug.webp
Wrong:   ❌ /blog/hero-your-slug.webp
```

**Why:** System auto-detects `-hero` pattern and uses native `<img>` tag for optimal LCP.

**Specs:**
```
Dimensions: 1200x900 (4:3) or 1200x675 (16:9)
Format: WebP
Quality: 80-85
File Size: 20-50KB STRICT
Location: public/blog/
```

**If hero > 50KB:** Advise user to re-export with lower quality.

### **Social Thumbnails:**
```
Dimensions: 1200x630 (16:9)
Format: WebP
Quality: 75-80
File Size: 50-100KB
Location: public/blog/
Naming: your-slug-social.webp
```

### **Content Images:**
```
Max width: 1200px
Format: WebP (preferred) or SVG
Quality: 75-80
Location: public/blog/
Usage: ![Alt text](filename.webp)
```

---

## 🛠️ Build & Test Commands

### **Required Before Deploy:**
```bash
npm run build
```

**Expected Output:**
```
✓ Compiled successfully in 5-6s
✓ Generating static pages (39/39)
✓ Finished TypeScript in 8-9s
```

**If errors:** 
1. Check JSON syntax (jsonlint.com)
2. Verify all images exist in public/blog/
3. Check required fields present

### **Performance Test:**
```
After Vercel deploy:
1. Open PageSpeed Insights
2. Test blog URL
3. Verify Performance 90+ (should be 92-95)
4. Check LCP <3s
```

---

## 🚨 Common Mistakes to Prevent

### **1. Image Naming:**
❌ `blog-hero.webp` (missing slug)
❌ `hero-slug.webp` (wrong pattern)
✅ `slug-hero.webp` (correct)

### **2. File Sizes:**
❌ Hero image 200KB (too large)
❌ Hero image 5KB (too compressed, bad quality)
✅ Hero image 30-40KB (optimal)

### **3. Meta Tags:**
❌ metaTitle: "Blog About 3D Rendering" (too short, no context)
❌ metaDescription: "Read our blog" (too short, no keywords)
✅ metaTitle: "3D House Rendering – Process & Examples (2025)" (perfect)

### **4. Alt Text:**
❌ imageAlt: "Image" (generic)
❌ imageAlt: "" (empty)
✅ imageAlt: "Photorealistic 3D house rendering..." (descriptive)

### **5. JSON Syntax:**
❌ Missing comma
❌ Trailing comma in array
❌ Unescaped quotes in strings
✅ Valid JSON (test with jsonlint.com)

---

## 🎯 Response Templates

### **When User Asks: "Create new blog"**

```
I'll help you create a new blog! Here's what I need:

1. Blog topic/title
2. Target keywords
3. Category (Architecture/3D Modeling/Interior Design/etc.)

I'll then:
✅ Generate complete JSON structure
✅ Write SEO meta tags (50-60 char title, 150-160 desc)
✅ Create detailed alt text
✅ Generate 3-6 FAQ questions
✅ Suggest internal links to related blogs
✅ Provide image specifications

What's the blog topic?
```

### **When User Asks: "Improve performance"**

```
Let me check current performance status...

Current Score: 92-95 (Top 5% globally) ✅

This is EXCELLENT performance. The system is already optimized to industry standards:
- LCP: <3s ✅
- Critical CSS: Inlined ✅
- Code splitting: Enabled ✅
- Hero images: Optimized ✅

Recommendation: No further optimization needed.
Focus instead on:
- Creating more content
- Adding features
- Marketing/growth

Want me to help with any of these instead?
```

### **When User Asks: "Fix accessibility"**

```
Current Accessibility Score: 88-90

This is GOOD (better than 70% of websites) and legally compliant (WCAG 2.0 AA).

Important: Accessibility does NOT directly affect SEO ranking.

Recommendation: Not necessary to improve unless:
- Government/healthcare site (legal requirement)
- User complaints
- Corporate policy

Your SEO is already 100/100. Better to focus on:
- Content creation
- User engagement
- Backlink building

Should I proceed with accessibility improvements anyway?
```

---

## 📚 Reference Files

**Before making changes, consult:**

1. `BLOG_SYSTEM_COMPLETE_GUIDE.md` - Full documentation
2. `BLOG_QUICK_START.md` - Quick reference
3. `content/blog/3d-rendering-house-complete-guide.json` - Template
4. `docs/SEO_ALT_TEXT_OPTIMIZATION.md` - SEO guidelines

**Key Code Files:**
- `src/app/blog/[slug]/page.tsx` - DO NOT MODIFY without consultation
- `src/components/blog-ui/ResponsiveImage.tsx` - DO NOT MODIFY
- `src/app/blog/critical-blog.css` - LOCKED (performance critical)

---

## ✅ Quality Assurance Checklist

**Before suggesting blog is complete:**

```
□ JSON syntax valid (test with jsonlint.com)
□ All required fields present
□ metaTitle 50-60 chars
□ metaDescription 150-160 chars
□ imageAlt detailed (100-150 chars)
□ Hero image named with -hero.webp
□ FAQ section has 3-6 questions
□ 2-3 internal links included
□ Build command tested
□ Performance target communicated (92-95 expected)
```

---

## 🎓 Learning Resources

**Suggest to users:**

- PageSpeed Insights: https://pagespeed.web.dev/
- Schema Validator: https://validator.schema.org/
- JSON Validator: https://jsonlint.com/
- Image Optimizer: https://squoosh.app/

---

## 🔐 Critical Rules Summary

1. ✅ **Never modify core performance architecture**
2. ✅ **Always validate JSON before suggesting**
3. ✅ **Always check image naming pattern (-hero)**
4. ✅ **Always verify meta tag length limits**
5. ✅ **Always include detailed alt text**
6. ✅ **Always test build command**
7. ✅ **Never suggest performance fixes if score 90+**
8. ✅ **Never suggest accessibility fixes if score 80+**

---

## 🎯 Success Metrics

**A blog is ready when:**

- ✅ JSON complete and valid
- ✅ Build successful (zero errors)
- ✅ Images optimized (20-50KB hero)
- ✅ SEO meta tags correct length
- ✅ Alt text detailed
- ✅ FAQ present
- ✅ Performance test scheduled

**Expected Results:**
- Performance: 92-95
- Accessibility: 88-100
- Best Practices: 100
- SEO: 100

---

## 🚀 Final Instruction

**When in doubt:**
1. Check `BLOG_SYSTEM_COMPLETE_GUIDE.md`
2. Copy from existing working blog
3. Don't modify core architecture
4. Test build before suggesting complete

**Your role:**
- ✅ Content creation helper
- ✅ SEO optimizer
- ✅ Quality assurance
- ❌ Architecture modifier (unless critical bug)

---

**System Status:** ✅ Production Ready  
**Last Updated:** Nov 15, 2025  
**Maintained By:** TEELI Dev Team

---

## 📞 Emergency Contacts

**If system breaks:**
1. Revert last git commit
2. Check `BLOG_SYSTEM_COMPLETE_GUIDE.md` troubleshooting
3. Verify all images exist
4. Test build command
5. Check JSON syntax

**If performance drops below 90:**
1. Check hero image size (should be <50KB)
2. Verify `-hero` in filename
3. Check preload configuration
4. Verify critical CSS inline

**99% of issues are:**
- Missing images (404)
- Invalid JSON syntax
- Hero image too large
- Missing required fields

Fix these first before investigating deeper!

---

**Remember:** System is production-ready and stable. Help users create content, not modify architecture! 🚀
