const fs = require('fs');
const paths = [
  './public/images/figma/destinations/thailand/hero.jpg',
  './public/images/figma/destinations/thailand/cities/Ko-Chang.jpg',
  './public/images/figma/destinations/thailand/cities/Hat-Yai.jpg',
  './public/images/figma/destinations/thailand/cities/Satun.jpg',
  './public/images/figma/destinations/thailand/cities/Pak-Chong.jpg',
  './public/images/figma/destinations/thailand/cities/Chumphon.jpg',
  './public/images/figma/destinations/thailand/cities/Mae-Hong-Son.jpg'
];

paths.forEach((p) => {
  try {
    const s = fs.statSync(p);
    console.log(p, s.size);
  } catch (err) {
    console.error('ERR', p, err.message);
  }
});
