#!/usr/bin/env node

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.join(__dirname, '..');

console.log('\n🔍 BLOG STRUCTURE VERIFICATION\n');

// Topic folders
const topics = [
  '3d-rendering',
  'ai-ml', 
  'cloud-devops',
  'digital-twins',
  'metaverse',
  'quantum',
  'sustainability',
  'blockchain'
];

const blogDir = path.join(rootDir, 'content', 'blog');
let totalPosts = 0;
let totalErrors = 0;

// Check each topic folder
topics.forEach(topic => {
  const topicDir = path.join(blogDir, topic);
  
  if (!fs.existsSync(topicDir)) {
    console.log(`❌ Missing folder: ${topic}`);
    totalErrors++;
    return;
  }
  
  const files = fs.readdirSync(topicDir).filter(f => f.endsWith('.json'));
  console.log(`✅ ${topic.padEnd(20)} ${files.length} posts`);
  totalPosts += files.length;
  
  // Validate JSON files
  files.forEach(file => {
    try {
      const content = fs.readFileSync(path.join(topicDir, file), 'utf8');
      const post = JSON.parse(content);
      
      // Check required fields
      const required = ['id', 'slug', 'title', 'category', 'date', 'author', 'excerpt', 'readTime'];
      const missing = required.filter(field => !post[field]);
      
      if (missing.length > 0) {
        console.log(`   ⚠️  ${file}: Missing ${missing.join(', ')}`);
        totalErrors++;
      }
    } catch (error) {
      console.log(`   ❌ ${file}: Invalid JSON - ${error.message}`);
      totalErrors++;
    }
  });
});

// Check for orphaned files in root
const rootFiles = fs.readdirSync(blogDir).filter(f => f.endsWith('.json'));
if (rootFiles.length > 0) {
  console.log(`\n⚠️  Found ${rootFiles.length} orphaned files in root:`);
  rootFiles.forEach(file => console.log(`   - ${file}`));
  totalErrors++;
}

console.log(`\n📊 SUMMARY`);
console.log(`   Total Posts: ${totalPosts}`);
console.log(`   Total Topics: ${topics.length}`);
console.log(`   Errors: ${totalErrors}`);

if (totalErrors === 0) {
  console.log(`\n✅ All checks passed!\n`);
  process.exit(0);
} else {
  console.log(`\n❌ Found ${totalErrors} issues\n`);
  process.exit(1);
}
