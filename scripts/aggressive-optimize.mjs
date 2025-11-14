#!/usr/bin/env node
import sharp from 'sharp';

async function aggressiveOptimize() {
  try {
    // Target: rendered-floor-plan-3d-hero.webp from 61KB to <40KB
    console.log('🎯 Aggressively optimizing rendered-floor-plan-3d-hero.webp...');
    
    const input = 'public/blog/rendered-floor-plan-3d-hero.webp';
    const output = 'public/blog/rendered-floor-plan-3d-hero-optimized.webp';
    
    // Try quality 60 with max effort
    await sharp(input)
      .webp({ quality: 60, effort: 6, smartSubsample: true })
      .toFile(output);
    
    const fs = await import('fs/promises');
    const stats = await fs.stat(output);
    const sizeKB = Math.round(stats.size / 1024 * 100) / 100;
    
    console.log(`✅ Optimized to ${sizeKB}KB`);
    
    if (sizeKB < 50) {
      // Replace original
      await fs.rename(output, input);
      console.log(`✅ Replaced original - Final size: ${sizeKB}KB`);
    } else {
      console.log(`⚠️  Still ${sizeKB}KB - trying quality 55...`);
      
      // Try quality 55
      await sharp(input)
        .webp({ quality: 55, effort: 6, smartSubsample: true })
        .toFile(output);
      
      const stats2 = await fs.stat(output);
      const sizeKB2 = Math.round(stats2.size / 1024 * 100) / 100;
      
      if (sizeKB2 < 50) {
        await fs.rename(output, input);
        console.log(`✅ Replaced with quality 55 - Final size: ${sizeKB2}KB`);
      } else {
        console.log(`⚠️  Cannot optimize below 50KB without quality loss`);
        await fs.unlink(output);
      }
    }
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

aggressiveOptimize();
