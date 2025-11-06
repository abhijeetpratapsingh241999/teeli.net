const fs = require('fs');
const path = require('path');

// Files that need fixing
const filesToFix = [
  'src/app/technology/multi-cloud/page.tsx',
  'src/app/technology/rendering-engine/page.tsx',
  'src/app/technology/research/page.tsx',
  'src/app/technology/ai-ml/page.tsx',
  'src/app/solutions/virtual-production/page.tsx',
];

filesToFix.forEach((file) => {
  const filePath = path.join(__dirname, file);
  let content = fs.readFileSync(filePath, 'utf8');

  // Remove useScroll hook calls and useTransform hook calls
  // Pattern 1: const { scrollYProgress } = useScroll({...});
  content = content.replace(
    /const\s*{\s*scrollYProgress\s*}\s*=\s*useScroll\s*\(\s*\{[\s\S]*?\}\s*\);?/g,
    ''
  );

  // Pattern 2: const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  content = content.replace(
    /const\s+\w+\s*=\s*useTransform\s*\(\s*scrollYProgress[\s\S]*?\);?/g,
    ''
  );

  // Remove motion.div style attributes with animate and initial
  content = content.replace(
    /\s+animate=\{[\s\S]*?\}\s+initial=\{[\s\S]*?\}/g,
    ''
  );

  // Clean up multiple blank lines
  content = content.replace(/\n\n\n+/g, '\n\n');

  fs.writeFileSync(filePath, content, 'utf8');
  console.log(`✅ Fixed: ${file}`);
});

console.log('\n✅ All framer-motion hooks removed!');
