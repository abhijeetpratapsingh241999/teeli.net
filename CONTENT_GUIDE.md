# 📝 TEELI.NET Blog Content Writing Guide

## 🎯 Blog Writing Best Practices

### 1. Blog Structure (Required Sections)

```
Title (H1)
├── Curiosity + Main Keyword
├── Example: "AI Rendering vs Traditional Rendering: The Future of 3D Visualization"

Intro (First Paragraph)
├── 3-4 lines explanation
├── What will reader learn?
├── Hook + Main Value Proposition

Main Sections (H2, H3)
├── Problem → Innovation → Technology → Business Impact
├── Break into small, digestible chunks
├── Use H2 for major topics, H3 for subtopics

Visual Content
├── Image/Chart/GIF every 2-3 sections
├── 3D renders, infographics, graphs

CTA (Call to Action)
├── At the end
├── "Try TEELI Render Portal" or "Book a Demo"

Meta Description
├── 150 characters summary
├── What shows in Google search results
```

### 2. Writing Style

✅ **DO:**
- Short, clear sentences
- One idea per paragraph
- Real research, authentic links, data
- Forward-looking statements: "By 2027 this will become standard..."
- End with actionable CTA

❌ **DON'T:**
- Long, complex sentences
- Multiple ideas in one paragraph
- Unverified claims
- Weak conclusions
- Missing next steps

### 3. SEO Optimization

**Keywords:**
- 1 main keyword (e.g., "AI Rendering")
- 2-3 supporting keywords
- Natural placement in title, H2, H3, content

**Internal Linking:**
- Link between blog articles
- Link to relevant pages

**Technical SEO:**
- Article Schema for Google
- Proper heading hierarchy (H1 → H2 → H3)
- Meta tags in frontmatter

**Quality over Quantity:**
- 2 excellent blogs per month > 10 mediocre blogs

### 4. File Format

**Current Setup:**
- **File**: `content/blog/[slug].json`
- **Content**: Markdown-formatted text
- **Frontmatter**: JSON metadata

**Structure:**
```json
{
  "id": 1,
  "slug": "article-slug",
  "title": "Article Title",
  "category": "Tech Trends",
  "date": "Dec 15, 2024",
  "author": "TEELI Team",
  "authorRole": "Lead AI Researcher",
  "excerpt": "Short description",
  "readTime": "5 min read",
  "featured": true,
  "image": "/blog/article-image.jpg",
  "content": "Markdown content here...\n\n# Heading\n\nParagraph..."
}
```

### 5. Content Types

**Supported Markdown:**
- `# Heading 1`
- `## Heading 2`
- `### Heading 3`
- `**Bold text**`
- `*Italic text*`
- `- List item`
- `---` Horizontal rule
- `` Code blocks ````

### 6. Article Topics (Recommended)

1. **AI & Machine Learning**
   - Neural rendering advances
   - GPT-4/Claude integration
   - Predictive rendering

2. **Technology**
   - Cloud infrastructure
   - Real-time rendering
   - GPU optimization

3. **Sustainability**
   - Green computing
   - Carbon tracking
   - Renewable energy

4. **Case Studies**
   - Client success stories
   - Industry applications
   - ROI demonstrations

## 🚀 Getting Started

1. Create new file: `content/blog/[slug].json`
2. Follow the JSON structure above
3. Write Markdown content in the "content" field
4. Add proper frontmatter metadata
5. Save and push to GitHub
6. Vercel auto-deploys ✨

## 📊 Content Calendar

**Suggested Schedule:**
- **Week 1**: Technology deep-dive
- **Week 2**: Industry trends / news
- **Week 3**: Case study / tutorial
- **Week 4**: Thought leadership

## 🎨 Style Guide

**Voice:**
- Professional yet approachable
- Data-driven with real examples
- Forward-thinking
- Technical but accessible

**Tone:**
- Confident
- Educational
- Inspiring
- Trustworthy

---

**Questions?** Contact the TEELI content team.

