const fs = require('fs');
const paths = [
  './public/images/figma/destinations/thailand/hero.jpg',
  './public/images/figma/destinations/thailand/cities/ko-chang.jpg',
  './public/images/figma/destinations/thailand/cities/hat-yai.jpg',
  './public/images/figma/destinations/thailand/cities/satun.jpg',
  './public/images/figma/destinations/thailand/cities/pak-chong.jpg',
  './public/images/figma/destinations/thailand/cities/chumphon.jpg',
  './public/images/figma/destinations/thailand/cities/mae-hong-son.jpg'
];

paths.forEach((p) => {
  try {
    const s = fs.statSync(p);
    console.log(p, s.size);
  } catch (err) {
    console.error('ERR', p, err.message);
  }
});
