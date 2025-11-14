#!/usr/bin/env node
/**
 * Convert WebP hero images to AVIF format for 30% better compression
 * Tests on rendered-floor-plan-3d-hero.webp first
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const blogImagesDir = path.join(projectRoot, 'public', 'blog');

// Test with the problematic image first
const testImage = 'rendered-floor-plan-3d-hero.webp';

async function getFileSize(filePath) {
  const stats = await fs.stat(filePath);
  return (stats.size / 1024).toFixed(2); // KB
}

async function convertToAVIF(imageName, quality = 50) {
  const webpPath = path.join(blogImagesDir, imageName);
  const avifPath = path.join(blogImagesDir, imageName.replace('.webp', '.avif'));
  
  try {
    const webpSize = await getFileSize(webpPath);
    console.log(`\n⏳ Converting ${imageName} (${webpSize}KB)...`);
    
    // Convert to AVIF with quality 50 (equivalent to WebP 65-70)
    await sharp(webpPath)
      .avif({
        quality: quality,
        effort: 9, // Maximum effort (0-9, higher = slower but better compression)
        chromaSubsampling: '4:2:0',
      })
      .toFile(avifPath);
    
    const avifSize = await getFileSize(avifPath);
    const savings = ((webpSize - avifSize) / webpSize * 100).toFixed(1);
    
    console.log(`✅ Created AVIF: ${avifSize}KB (${savings}% smaller)`);
    
    if (parseFloat(avifSize) > 50) {
      console.log(`⚠️ Still above 50KB target. Trying quality ${quality - 5}...`);
      
      // Try lower quality
      await sharp(webpPath)
        .avif({
          quality: quality - 5,
          effort: 9,
          chromaSubsampling: '4:2:0',
        })
        .toFile(avifPath);
      
      const lowerAvifSize = await getFileSize(avifPath);
      const lowerSavings = ((webpSize - lowerAvifSize) / webpSize * 100).toFixed(1);
      console.log(`✅ Quality ${quality - 5}: ${lowerAvifSize}KB (${lowerSavings}% smaller)`);
    }
    
    return { webpSize, avifSize };
  } catch (error) {
    console.error(`❌ Failed to convert ${imageName}:`, error.message);
    return null;
  }
}

async function main() {
  console.log('🎯 Testing AVIF conversion for performance optimization\n');
  console.log('Target: <50KB hero images for LCP <2.5s\n');
  
  // Test with the problematic image
  const result = await convertToAVIF(testImage, 50);
  
  if (result) {
    const { webpSize, avifSize } = result;
    console.log(`\n📊 COMPARISON:`);
    console.log(`   WebP: ${webpSize}KB`);
    console.log(`   AVIF: ${avifSize}KB`);
    console.log(`\n💡 If AVIF is smaller, we'll convert all hero images.`);
  }
}

main();
