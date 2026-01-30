const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function walkFiles(dir, out = []) {
  const items = fs.readdirSync(dir, { withFileTypes: true });
  for (const it of items) {
    const full = path.join(dir, it.name);
    if (it.isDirectory()) {
      if (it.name === 'node_modules' || it.name === '.next' || it.name === '.git') continue;
      walkFiles(full, out);
    } else if (/\.(js|jsx|ts|tsx)$/.test(it.name)) {
      out.push(full.replace(root + path.sep, ''));
    }
  }
  return out;
}

const files = walkFiles(root);

const re = /\/images\/figma\/([^\"'<>\)\s]+\.(?:jpg|jpeg|png|svg))/gi; // only explicit filenames with extensions
let problems = [];
for (const f of files) {
  const fullPath = path.join(root, f);
  const content = fs.readFileSync(fullPath, 'utf8');
  let m;
  while ((m = re.exec(content)) !== null) {
    const ref = m[1];
    const refPath = path.join(root, 'public', 'images', 'figma', ref);
    // Skip dynamic template refs like ${slug} and encoded patterns
    if (ref.includes('${') || ref.includes('%')) continue;

    if (!fs.existsSync(refPath)) {
      problems.push({ file: f, ref, issue: 'MISSING' });
    } else {
      // Verify case-sensitive equality by comparing path segments
      const segments = ref.split('/');
      let cur = path.join(root, 'public', 'images', 'figma');
      let mismatch = false;
      for (const seg of segments) {
        const items = fs.readdirSync(cur);
        if (!items.includes(seg)) {
          mismatch = true;
          break;
        }
        cur = path.join(cur, seg);
      }
      if (mismatch) problems.push({ file: f, ref, issue: 'CASE_MISMATCH' });
    }
  }
}

if (problems.length === 0) {
  console.log('All referenced images found with exact casing.');
  process.exit(0);
}

for (const p of problems) console.log(p.issue, p.file, p.ref);
console.log('\nCount:', problems.length);
process.exit(1);
