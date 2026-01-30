const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, '..', 'public', 'images', 'figma', 'destinations', 'thailand', 'cities');
const mapping = {
  'Ko-Chang.jpg': 'ko-chang.jpg',
  'Hat-Yai.jpg': 'hat-yai.jpg',
  'Satun.jpg': 'satun.jpg',
  'Pak-Chong.jpg': 'pak-chong.jpg',
  'Chumphon.jpg': 'chumphon.jpg',
  'Mae-Hong-Son.jpg': 'mae-hong-son.jpg',
};

for (const [srcName, destName] of Object.entries(mapping)) {
  const src = path.join(dir, srcName);
  const dest = path.join(dir, destName);
  try {
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      fs.unlinkSync(src);
      console.log(`renamed ${srcName} -> ${destName}`);
    } else if (fs.existsSync(dest)) {
      console.log(`destination already exists: ${destName}`);
    } else {
      console.log(`missing source: ${srcName}`);
    }
  } catch (err) {
    console.error('error processing', srcName, err.message);
  }
}

console.log('done');
