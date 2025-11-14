#!/usr/bin/env node

/**
 * Hero Image Optimizer
 * 
 * Optimizes blog hero images (1200x900) for LCP performance
 * Target: < 50KB per image with quality 75
 * 
 * Usage: node scripts/optimize-hero-images.mjs
 */

import sharp from 'sharp';
import { readdir, stat } from 'fs/promises';
import { join } from 'path';

const BLOG_DIR = 'public/blog';
const TARGET_SIZE = 50 * 1024; // 50KB
const QUALITY_START = 75;
const QUALITY_MIN = 60;

async function optimizeImage(filePath) {
  try {
    const stats = await stat(filePath);
    const originalSize = stats.size;
    
    // Skip if already optimized
    if (originalSize < TARGET_SIZE) {
      console.log(`✓ ${filePath.split('/').pop()} - Already optimized (${Math.round(originalSize / 1024)}KB)`);
      return;
    }
    
    console.log(`⏳ Optimizing ${filePath.split('/').pop()} (${Math.round(originalSize / 1024)}KB)...`);
    
    // Try different quality levels
    let quality = QUALITY_START;
    let optimized = false;
    
    while (quality >= QUALITY_MIN && !optimized) {
      await sharp(filePath)
        .webp({ quality, effort: 6 })
        .toFile(filePath + '.tmp');
      
      const newStats = await stat(filePath + '.tmp');
      const newSize = newStats.size;
      
      if (newSize < TARGET_SIZE) {
        // Replace original
        await sharp(filePath + '.tmp')
          .toFile(filePath);
        
        console.log(`✓ ${filePath.split('/').pop()} - Optimized to ${Math.round(newSize / 1024)}KB (quality ${quality})`);
        optimized = true;
      } else {
        quality -= 5;
      }
      
      // Cleanup temp file
      try {
        await import('fs/promises').then(fs => fs.unlink(filePath + '.tmp'));
      } catch {}
    }
    
    if (!optimized) {
      console.log(`⚠️  ${filePath.split('/').pop()} - Could not optimize below ${TARGET_SIZE / 1024}KB`);
    }
  } catch (error) {
    console.error(`❌ Error optimizing ${filePath}:`, error.message);
  }
}

async function processDirectory() {
  try {
    const files = await readdir(BLOG_DIR);
    const heroImages = files.filter(f => f.endsWith('-hero.webp'));
    
    console.log(`\n📊 Found ${heroImages.length} hero images\n`);
    
    for (const file of heroImages) {
      await optimizeImage(join(BLOG_DIR, file));
    }
    
    console.log('\n✅ Optimization complete!\n');
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

processDirectory();
