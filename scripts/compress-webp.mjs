#!/usr/bin/env node

/**
 * Single WebP Image Compression Script
 * Compresses a specific WebP file to target size
 * 
 * Usage: node scripts/compress-webp.mjs <input-file> [quality]
 */

import sharp from 'sharp';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Default target: compress floor-plan-3dview.webp
const INPUT_FILE = process.argv[2] || 'public/blog/floor-plan-3dview.webp';
const QUALITY = parseInt(process.argv[3]) || 75; // Lower quality for better compression

async function compressWebP(inputPath, quality = 75) {
  try {
    const fullPath = path.resolve(inputPath);
    
    if (!fs.existsSync(fullPath)) {
      console.error(`❌ File not found: ${fullPath}`);
      process.exit(1);
    }

    // Get original size
    const originalSize = (fs.statSync(fullPath).size / 1024).toFixed(2);
    console.log(`\n📸 Original: ${path.basename(fullPath)}`);
    console.log(`   Size: ${originalSize} KB`);

    // Create backup
    const backupPath = fullPath.replace('.webp', '.webp.backup');
    fs.copyFileSync(fullPath, backupPath);
    console.log(`   ✅ Backup created: ${path.basename(backupPath)}`);

    // Get metadata
    const metadata = await sharp(fullPath).metadata();
    console.log(`   Dimensions: ${metadata.width}x${metadata.height}px`);

    // Compress with specified quality
    const tempPath = fullPath.replace('.webp', '.temp.webp');
    await sharp(fullPath)
      .webp({ 
        quality: quality,
        effort: 6 // Higher effort = better compression
      })
      .toFile(tempPath);

    const compressedSize = (fs.statSync(tempPath).size / 1024).toFixed(2);
    const savings = ((1 - compressedSize / originalSize) * 100).toFixed(1);

    console.log(`\n🎯 Compressed (Quality ${quality}%):`);
    console.log(`   Size: ${compressedSize} KB`);
    console.log(`   Savings: ${savings}%`);

    if (parseFloat(compressedSize) < 300) {
      console.log(`   ✅ Target achieved (<300 KB)`);
    } else {
      console.log(`   ⚠️  Still above 300 KB - try lower quality`);
    }

    // Replace original
    fs.renameSync(tempPath, fullPath);
    console.log(`\n✨ Optimization complete!`);
    console.log(`   New file: ${fullPath}`);
    console.log(`   Backup: ${backupPath}\n`);

    return {
      original: originalSize,
      compressed: compressedSize,
      savings: savings
    };

  } catch (error) {
    console.error(`\n❌ Error:`, error.message);
    process.exit(1);
  }
}

// Run
compressWebP(INPUT_FILE, QUALITY);
