const fs = require('fs');
const path = require('path');

function normalizeName(name) {
  // split name and ext
  const ext = path.extname(name).toLowerCase();
  let base = path.basename(name, ext);
  // replace spaces, underscores and percent encodings with hyphens
  base = base.replace(/%20/g, '-');
  base = base.replace(/[ _]+/g, '-');
  // remove quotes and parentheses
  base = base.replace(/["'()]/g, '');
  // collapse multiple hyphens
  base = base.replace(/-+/g, '-');
  // lowercase and trim -
  base = base.toLowerCase().replace(/(^-|-$)/g, '');
  return base + ext;
}

function walk(dir) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) {
      walk(full);
      continue;
    }
    const normalized = normalizeName(it.name);
    if (normalized !== it.name) {
      const dest = path.join(dir, normalized);
      if (fs.existsSync(dest)) {
        console.log('target exists, removing source:', full, '->', dest);
        fs.unlinkSync(full);
      } else {
        fs.renameSync(full, dest);
        console.log('renamed:', full, '->', dest);
      }
    }
  }
}

const root = path.join(__dirname, '..', 'public', 'images', 'figma');
if (!fs.existsSync(root)) {
  console.error('root not found:', root);
  process.exit(1);
}

walk(root);
console.log('normalization complete');
