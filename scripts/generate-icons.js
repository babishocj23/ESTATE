import sharp from 'sharp';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import { existsSync, mkdirSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LOGO_PATH = join(__dirname, '../src/assets/logo.svg');
const PUBLIC_DIR = join(__dirname, '../public');

// Ensure public directory exists
if (!existsSync(PUBLIC_DIR)) {
  mkdirSync(PUBLIC_DIR);
}

// Icon sizes to generate
const ICON_SIZES = [
  { size: 192, name: 'icon-192.png' },
  { size: 512, name: 'icon-512.png' },
  { size: 180, name: 'apple-touch-icon.png' },
  { size: 32, name: 'favicon.png' }
];

async function generateIcons() {
  try {
    // Generate icons for each size
    for (const icon of ICON_SIZES) {
      await sharp(LOGO_PATH)
        .resize(icon.size, icon.size)
        .png()
        .toFile(join(PUBLIC_DIR, icon.name));
      
      console.log(`Generated ${icon.name}`);
    }
    
    console.log('All icons generated successfully!');
  } catch (error) {
    console.error('Error generating icons:', error);
  }
}

generateIcons(); 