#!/usr/bin/env node
import sharp from 'sharp';

async function createSocialThumbnails() {
  try {
    // Create social thumbnail for 3d-product-rendering (1200x630)
    await sharp('public/blog/3d-product-rendering-hero.webp')
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .webp({ quality: 80, effort: 6 })
      .toFile('public/blog/3d-product-rendering-social.webp');
    
    console.log('✅ Created 3d-product-rendering-social.webp');
    
    // Create social thumbnail for 3d-rendering-house (1200x630)
    await sharp('public/blog/3d-rendering-house-hero.webp')
      .resize(1200, 630, { fit: 'cover', position: 'center' })
      .webp({ quality: 80, effort: 6 })
      .toFile('public/blog/3d-rendering-house-social.webp');
    
    console.log('✅ Created 3d-rendering-house-social.webp');
  } catch (error) {
    console.error('❌ Error:', error.message);
  }
}

createSocialThumbnails();
