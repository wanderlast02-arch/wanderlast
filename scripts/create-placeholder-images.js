const fs = require('fs');
const path = require('path');

const jpegBase64 = 
  '/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUTEhIVFhUVFRUVFRUVFRUVFRUWFhUVFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMsNygtLisBCgoKDg0OGxAQGy0lICYtLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLf/AABEIAKAAoAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADoQAAIBAwMCBAQFBQAAAAAAAAECAwAEEQUSITEGEyJBUWFxgZGhscHR8BQjQlKx0fEVJTRT/8QAGgEAAwEBAQEAAAAAAAAAAAAAAAECBAMFBv/EACARAQEAAgMAAgIDAAAAAAAAAAABAhEDIRIxBBRBUTJh/9oADAMBAAIRAxEAPwD7qAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAP/2Q==';

const pngBase64 =
  'iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mP8Xw8AAtUB9oVQqakAAAAASUVORK5CYII=';

const svgContent = (text) => `<?xml version="1.0" encoding="UTF-8"?>\n<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"1200\" height=\"800\">\n  <rect width=\"100%\" height=\"100%\" fill=\"#cccccc\"/>\n  <text x=\"50%\" y=\"50%\" dominant-baseline=\"middle\" text-anchor=\"middle\" font-size=\"36\" fill=\"#666\">${text}</text>\n</svg>`;

const targets = [
  'public/images/figma/placeholder.jpg',
  'public/images/figma/country-thailand.jpg',
  'public/images/figma/country-greece.jpg',
  'public/images/figma/destinations/thailand.jpg',
  'public/images/figma/destinations/greece.jpg',
  'public/images/figma/destinations/japan.jpg',
  'public/images/figma/destinations/peru.jpg',
  'public/images/figma/destinations/cambodia.jpg',
  'public/images/figma/destinations/malaysia.jpg',
  'public/images/figma/destinations/thailand/hero.jpg',
  'public/images/figma/destinations/thailand/cities/ko-chang.jpg',
  'public/images/figma/destinations/thailand/cities/hat-yai.jpg',
  'public/images/figma/destinations/thailand/cities/satun.jpg',
  'public/images/figma/destinations/thailand/cities/pak-chong.jpg',
  'public/images/figma/destinations/thailand/cities/chumphon.jpg',
  'public/images/figma/destinations/thailand/cities/mae-hong-son.jpg',
  'public/images/figma/destinations/bangkok.jpg',
  'public/images/figma/destinations/phuket.jpg',
  'public/images/figma/destinations/pattaya.jpg',
  'public/images/figma/destinations/chiang-mai.jpg',
  'public/images/figma/experiences/bangkok-street-food.jpg',
  'public/images/figma/experiences/thailand.jpg',
  'public/images/figma/experiences/greece.jpg',
  'public/images/figma/experiences/japan.jpg',
  'public/images/figma/experiences/cambodia.jpg',
  'public/images/figma/experiences/thailand/bangkok/street-food.jpg',
  'public/images/figma/experiences/thailand/bangkok/grand-palace.jpg',
  'public/images/figma/experiences/thailand/phuket/island-hopping.jpg',
  'public/images/figma/country-page.png',
  'public/images/figma/home-page.png',
  'public/images/figma/logo.svg'
];

for (const t of targets) {
  const dir = path.dirname(t);
  fs.mkdirSync(dir, { recursive: true });
  if (t.endsWith('.svg')) {
    fs.writeFileSync(t, svgContent(path.basename(t)) , 'utf8');
  } else if (t.endsWith('.png')) {
    fs.writeFileSync(t, Buffer.from(pngBase64, 'base64'));
  } else {
    fs.writeFileSync(t, Buffer.from(jpegBase64, 'base64'));
  }
  console.log('wrote', t);
}

console.log('placeholder images created.');
