#!/usr/bin/env node

/**
 * Comprehensive Image Optimizer for All Hero Images
 * 
 * Optimizes ALL blog hero images with:
 * - Quality 65 for hero images
 * - Smart subsampling
 * - Maximum compression effort
 * - Target: <50KB per image
 */

import sharp from 'sharp';
import { readdir, stat, rename } from 'fs/promises';
import { join } from 'path';

const BLOG_DIR = 'public/blog';
const QUALITY = 65; // Optimized for LCP
const EFFORT = 6; // Maximum compression

async function optimizeAllHeroImages() {
  try {
    const files = await readdir(BLOG_DIR);
    const heroImages = files.filter(f => f.endsWith('-hero.webp'));
    
    console.log(`\n📊 Found ${heroImages.length} hero images to optimize\n`);
    
    let optimized = 0;
    let skipped = 0;
    let failed = 0;
    
    for (const file of heroImages) {
      const filePath = join(BLOG_DIR, file);
      const originalStats = await stat(filePath);
      const originalSizeKB = Math.round(originalStats.size / 1024 * 100) / 100;
      
      // Skip if already optimal
      if (originalSizeKB < 50) {
        console.log(`✓ ${file} - Already optimized (${originalSizeKB}KB)`);
        skipped++;
        continue;
      }
      
      try {
        console.log(`⏳ Optimizing ${file} (${originalSizeKB}KB)...`);
        
        const tempPath = filePath + '.tmp';
        
        await sharp(filePath)
          .webp({ 
            quality: QUALITY, 
            effort: EFFORT,
            smartSubsample: true,
            nearLossless: false
          })
          .toFile(tempPath);
        
        const newStats = await stat(tempPath);
        const newSizeKB = Math.round(newStats.size / 1024 * 100) / 100;
        const savings = Math.round((originalSizeKB - newSizeKB) * 100) / 100;
        const savingsPercent = Math.round((savings / originalSizeKB) * 100);
        
        // Replace if optimized
        if (newSizeKB < originalSizeKB) {
          await rename(tempPath, filePath);
          console.log(`✅ ${file} - ${originalSizeKB}KB → ${newSizeKB}KB (saved ${savings}KB / ${savingsPercent}%)`);
          optimized++;
        } else {
          console.log(`⚠️  ${file} - No improvement`);
          await import('fs/promises').then(fs => fs.unlink(tempPath).catch(() => {}));
          skipped++;
        }
      } catch (error) {
        console.error(`❌ ${file} - Error: ${error.message}`);
        failed++;
      }
    }
    
    console.log(`\n📈 Summary:`);
    console.log(`  ✅ Optimized: ${optimized}`);
    console.log(`  ⏭️  Skipped: ${skipped}`);
    console.log(`  ❌ Failed: ${failed}`);
    console.log(`\n✅ Optimization complete!\n`);
    
  } catch (error) {
    console.error('❌ Fatal error:', error.message);
    process.exit(1);
  }
}

optimizeAllHeroImages();
