const fs = require('fs');
const path = require('path');

// Helper to recursively find files
function findFiles(dir, pattern) {
  const files = [];
  const items = fs.readdirSync(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...findFiles(fullPath, pattern));
    } else if (item.isFile() && item.name.endsWith(pattern)) {
      files.push(fullPath);
    }
  }
  return files;
}

// Find all TSX files
const files = findFiles('src', '.tsx');

let fixed = 0;

files.forEach(file => {
  try {
    let content = fs.readFileSync(file, 'utf8');
    const original = content;
    
    // Fix various patterns of stray braces
    content = content
      // Fix <div}}}} patterns (most common)
      .replace(/(<(div|section|button|span|a|li|ul|nav)[^>]*)}}}}+\s*\n/g, '$1\n')
      .replace(/(<(div|section|button|span|a|li|ul|nav)[^>]*)}}}\s*\n/g, '$1\n')
      .replace(/(<(div|section|button|span|a|li|ul|nav)[^>]*)}}}}+\s*>/g, '$1>')
      // Remove trailing }} after closing quotes
      .replace(/className="([^"]*)"\s*}}\s*>/g, 'className="$1">')
      .replace(/className="([^"]*)"\s*}}\s*\n/g, 'className="$1"\n')
      // Fix key attributes with trailing braces
      .replace(/key=\{([^}]+)\}}}+/g, 'key={$1}')
      // Remove standalone }}} or }}}}
      .replace(/^\s*}}}}+\s*$/gm, '')
      .replace(/^\s*}}}\s*$/gm, '')
      // Fix px` issues
      .replace(/"px`,/g, 'px",')
      .replace(/px`\s*,/g, 'px",')
      // Remove }} after style object properties
      .replace(/(width|height|left|top|bottom|right):\s*`([^`]+)`\s*}}+/g, '$1: `$2`');
    
    if (content !== original) {
      fs.writeFileSync(file, content, 'utf8');
      console.log(`Fixed: ${path.relative('src', file)}`);
      fixed++;
    }
  } catch (err) {
    console.error(`Error in ${file}: ${err.message}`);
  }
});

console.log(`\nTotal files fixed: ${fixed}`);
