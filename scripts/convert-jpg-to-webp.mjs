#!/usr/bin/env node
import sharp from 'sharp';

async function convert() {
  try {
    await sharp('public/blog/generative-ai-architecture.jpg')
      .webp({ quality: 75, effort: 6 })
      .resize(1200, 900, { fit: 'cover' })
      .toFile('public/blog/3d-rendering-house-hero.webp');
    
    console.log('✅ Converted JPG to WebP successfully');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

convert();
