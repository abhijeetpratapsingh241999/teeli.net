#!/usr/bin/env node

/**
 * Image Optimization Script
 * 
 * Converts blog images (jpg, png) to modern formats (webp, avif)
 * - No upscaling
 * - Preserves original quality
 * - Prints before/after size comparison
 * 
 * Usage: npm run optimize:images
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const BLOG_DIR = path.join(__dirname, '..', 'public', 'blog');
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png'];

/**
 * Get file size in KB
 */
function getFileSize(filePath) {
  const stats = fs.statSync(filePath);
  return (stats.size / 1024).toFixed(2);
}

/**
 * Convert image to WebP and AVIF
 */
async function optimizeImage(inputPath) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    
    if (!SUPPORTED_FORMATS.includes(ext)) {
      return;
    }

    const filename = path.basename(inputPath, ext);
    const dirname = path.dirname(inputPath);
    
    const webpPath = path.join(dirname, `${filename}.webp`);
    const avifPath = path.join(dirname, `${filename}.avif`);

    // Get original size
    const originalSize = getFileSize(inputPath);
    console.log(`\n📸 Processing: ${path.basename(inputPath)} (${originalSize} KB)`);

    // Get image metadata to avoid upscaling
    const metadata = await sharp(inputPath).metadata();
    const { width, height } = metadata;

    // Convert to WebP
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .webp({ quality: 85 })
      .toFile(webpPath);
    
    const webpSize = getFileSize(webpPath);
    const webpSavings = ((1 - webpSize / originalSize) * 100).toFixed(1);
    console.log(`  ✅ WebP: ${webpSize} KB (${webpSavings}% smaller)`);

    // Convert to AVIF (best compression)
    await sharp(inputPath)
      .resize(width, height, {
        fit: 'inside',
        withoutEnlargement: true
      })
      .avif({ quality: 80 })
      .toFile(avifPath);
    
    const avifSize = getFileSize(avifPath);
    const avifSavings = ((1 - avifSize / originalSize) * 100).toFixed(1);
    console.log(`  ✅ AVIF: ${avifSize} KB (${avifSavings}% smaller)`);

    return {
      original: originalSize,
      webp: webpSize,
      avif: avifSize,
      webpSavings,
      avifSavings
    };
  } catch (error) {
    console.error(`  ❌ Error processing ${inputPath}:`, error.message);
    return null;
  }
}

/**
 * Recursively process all images in directory
 */
async function processDirectory(dirPath) {
  const files = fs.readdirSync(dirPath);
  const results = [];

  for (const file of files) {
    const fullPath = path.join(dirPath, file);
    const stat = fs.statSync(fullPath);

    if (stat.isDirectory()) {
      const subResults = await processDirectory(fullPath);
      results.push(...subResults);
    } else {
      const result = await optimizeImage(fullPath);
      if (result) {
        results.push(result);
      }
    }
  }

  return results;
}

/**
 * Main execution
 */
async function main() {
  console.log('🚀 Starting image optimization for blog directory...\n');
  console.log(`📁 Target: ${BLOG_DIR}\n`);

  if (!fs.existsSync(BLOG_DIR)) {
    console.error('❌ Blog directory not found:', BLOG_DIR);
    process.exit(1);
  }

  const results = await processDirectory(BLOG_DIR);

  if (results.length === 0) {
    console.log('\n⚠️  No images found to optimize.');
    return;
  }

  // Calculate totals
  const totalOriginal = results.reduce((sum, r) => sum + parseFloat(r.original), 0);
  const totalWebp = results.reduce((sum, r) => sum + parseFloat(r.webp), 0);
  const totalAvif = results.reduce((sum, r) => sum + parseFloat(r.avif), 0);

  console.log('\n' + '='.repeat(50));
  console.log('📊 SUMMARY');
  console.log('='.repeat(50));
  console.log(`✅ Total images processed: ${results.length}`);
  console.log(`📦 Original total size: ${totalOriginal.toFixed(2)} KB`);
  console.log(`📦 WebP total size: ${totalWebp.toFixed(2)} KB`);
  console.log(`📦 AVIF total size: ${totalAvif.toFixed(2)} KB`);
  console.log(`💾 WebP savings: ${((1 - totalWebp / totalOriginal) * 100).toFixed(1)}%`);
  console.log(`💾 AVIF savings: ${((1 - totalAvif / totalOriginal) * 100).toFixed(1)}%`);
  console.log('='.repeat(50));
  console.log('\n✨ Optimization complete!\n');
}

main().catch(console.error);
