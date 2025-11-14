#!/usr/bin/env node
/**
 * Convert ALL WebP hero images to AVIF format
 * AVIF provides 15-30% better compression than WebP
 */

import sharp from 'sharp';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');

const blogImagesDir = path.join(projectRoot, 'public', 'blog');

const heroImages = [
  '3d-building-designer-pipeline-hero.webp',
  '3d-product-rendering-hero.webp',
  '3d-rendering-house-hero.webp',
  '3d-visualizer-workspace-setup-hero.webp',
  'agentic-ai-architecture-workflow-hero.webp',
  'architect-sketch-process-hero.webp',
  'interior-rendering-pipeline-hero.webp',
  'realistic-room-lighting-composition-hero.webp',
  'rendered-floor-plan-3d-hero.webp',
  'rendering-drawing-evolution-hero.webp',
  'room-3d-model-workflow-hero.webp',
];

async function getFileSize(filePath) {
  try {
    const stats = await fs.stat(filePath);
    return (stats.size / 1024).toFixed(2);
  } catch {
    return null;
  }
}

async function convertToAVIF(imageName) {
  const webpPath = path.join(blogImagesDir, imageName);
  const avifPath = path.join(blogImagesDir, imageName.replace('.webp', '.avif'));
  
  try {
    const webpSize = await getFileSize(webpPath);
    if (!webpSize) {
      console.log(`⏭️ Skipping ${imageName} (not found)`);
      return { success: false, reason: 'not-found' };
    }
    
    console.log(`⏳ Converting ${imageName} (${webpSize}KB)...`);
    
    // Quality 45 for AVIF (equivalent to WebP 60-65)
    await sharp(webpPath)
      .avif({
        quality: 45,
        effort: 9, // Maximum compression effort
        chromaSubsampling: '4:2:0',
      })
      .toFile(avifPath);
    
    const avifSize = await getFileSize(avifPath);
    const savings = ((webpSize - avifSize) / webpSize * 100).toFixed(1);
    
    const status = parseFloat(avifSize) < 50 ? '✅' : '⚠️';
    console.log(`${status} AVIF: ${avifSize}KB (${savings}% smaller than WebP)`);
    
    return { 
      success: true, 
      webpSize: parseFloat(webpSize),
      avifSize: parseFloat(avifSize),
      savings: parseFloat(savings)
    };
  } catch (error) {
    console.error(`❌ Failed: ${error.message}`);
    return { success: false, reason: error.message };
  }
}

async function main() {
  console.log('🚀 Converting ALL hero images to AVIF format\n');
  console.log('Quality: 45 (optimal for <50KB target)\n');
  
  let totalConverted = 0;
  let totalWebpSize = 0;
  let totalAvifSize = 0;
  
  for (const imageName of heroImages) {
    const result = await convertToAVIF(imageName);
    
    if (result.success) {
      totalConverted++;
      totalWebpSize += result.webpSize;
      totalAvifSize += result.avifSize;
    }
    
    console.log(''); // Spacing
  }
  
  console.log(`\n📈 SUMMARY:`);
  console.log(`   ✅ Converted: ${totalConverted}/${heroImages.length}`);
  console.log(`   📦 Total WebP: ${totalWebpSize.toFixed(2)}KB`);
  console.log(`   📦 Total AVIF: ${totalAvifSize.toFixed(2)}KB`);
  console.log(`   💾 Total saved: ${(totalWebpSize - totalAvifSize).toFixed(2)}KB (${((totalWebpSize - totalAvifSize) / totalWebpSize * 100).toFixed(1)}%)`);
  console.log(`\n✅ AVIF images ready for Next.js automatic format selection`);
}

main();
