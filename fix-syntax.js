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
      // Fix className="..."}> patterns (MOST COMMON ERROR)
      .replace(/className="([^"]+)"\s*}\s*\n/g, 'className="$1"\n')
      .replace(/className="([^"]+)"\s*}\s*>/g, 'className="$1">')
      
      // Fix <element}}> patterns
      .replace(/(<(div|button|h1|p)[^>]*)}}+\s*\n/g, '$1\n')
      .replace(/(<(div|button|h1|p)[^>]*)}}+\s*>/g, '$1>')
      
      // Fix value={{ ... > patterns (missing }})
      .replace(/value=\{\{([^}]+)\s+>\s*\n/g, 'value={{$1}}\n  >')
      
      // Fix camera={{ ... > patterns (missing }})
      .replace(/camera=\{\{([^}]+)\s+>\s*\n/g, 'camera={{$1}}>\n')
      
      // Fix broken style objects - width: "... patterns
      .replace(/width:\s*`([^`]+)"\s*,\s*\n\s*height:\s*`/g, 'width: `$1`,\n                height: `')
      
      // Fix broken className with stray % or rad)
      .replace(/className="([^"]+)"[^>]*%`\s*,/g, 'style={{ left: `${Math.random() * 100}%` }}')
      .replace(/className="([^"]+)"[^>]*rad\)\s*`\s*,/g, 'style={{ transform: `rotate(${angle}rad)` }}')
      
      // Fix standalone }}} or }}}}
      .replace(/^\s*}}}}+\s*$/gm, '')
      .replace(/^\s*}}}\s*$/gm, '');
    
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
