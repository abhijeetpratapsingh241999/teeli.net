import sharp from 'sharp';

console.log('🔧 Fixing WebP images from SVG sources...\n');

// Fix rendering-drawing-example.webp
console.log('1️⃣ Processing rendering-drawing-example.svg...');
try {
  await sharp('public/blog/rendering-drawing-example.svg')
    .resize(1200, 900, {
      fit: 'contain',
      background: { r: 248, g: 250, b: 252, alpha: 1 }
    })
    .webp({
      quality: 90,  // Increased from 85 to 90
      effort: 6,
      smartSubsample: true
    })
    .toFile('public/blog/rendering-drawing-example.webp');
  
  const stats1 = await sharp('public/blog/rendering-drawing-example.webp').metadata();
  console.log(`   ✅ Created: ${stats1.width}x${stats1.height}, ${stats1.size} bytes`);
} catch (error) {
  console.error(`   ❌ Error: ${error.message}`);
}

// Fix rendering-drawing-future.webp
console.log('\n2️⃣ Processing rendering-drawing-future.svg...');
try {
  await sharp('public/blog/rendering-drawing-future.svg')
    .resize(1200, 900, {
      fit: 'contain',
      background: { r: 15, g: 23, b: 42, alpha: 1 }  // Dark background matching SVG
    })
    .webp({
      quality: 90,  // Increased quality
      effort: 6,
      smartSubsample: true
    })
    .toFile('public/blog/rendering-drawing-future.webp');
  
  const stats2 = await sharp('public/blog/rendering-drawing-future.webp').metadata();
  console.log(`   ✅ Created: ${stats2.width}x${stats2.height}, ${stats2.size} bytes`);
} catch (error) {
  console.error(`   ❌ Error: ${error.message}`);
}

console.log('\n✅ WebP images recreated with higher quality!\n');
console.log('📝 Note: SVG animations will not appear in WebP (static format)');
console.log('💡 To see full animations, change blog JSON to use .svg instead of .webp\n');
