const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, 'AI_Task (2)', 'AI_Task');
const outputImagesDir = path.join(__dirname, 'public', 'gallery', 'images');

if (!fs.existsSync(outputImagesDir)) {
  fs.mkdirSync(outputImagesDir, { recursive: true });
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      // Exclude video folder
      if (file.toLowerCase().includes('video')) continue;
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function processMedia() {
  const allFiles = getAllFiles(sourceDir);
  console.log(`Found ${allFiles.length} image files to process.`);

  const mediaManifest = [];
  let imageCounter = 1;

  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath, ext);
    const parentFolder = path.basename(path.dirname(filePath));

    // Handle ONLY valid images (png, jpg, jpeg, webp)
    if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      const cleanName = `${parentFolder.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${fileName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${imageCounter++}.webp`;
      const outPath = path.join(outputImagesDir, cleanName);

      try {
        await sharp(filePath)
          .resize({ width: 720, height: 720, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 80, effort: 4 })
          .toFile(outPath);

        const relativeWebPath = `/gallery/images/${cleanName}`;
        mediaManifest.push({
          id: `img-${imageCounter}`,
          type: 'image',
          src: relativeWebPath,
          alt: `${parentFolder} - ${fileName}`,
          title: fileName.replace(/[_-]/g, ' '),
          category: parentFolder.replace(/_/g, ' ')
        });
      } catch (err) {
        console.error(`Error converting ${filePath}:`, err.message);
      }
    }
  }

  const tsContent = `// Auto-generated gallery media manifest (Pure Images Only)
export interface GalleryItem {
  id: string;
  type: 'image';
  src: string;
  alt: string;
  title: string;
  category: string;
}

export const GALLERY_ITEMS: GalleryItem[] = ${JSON.stringify(mediaManifest, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, 'src', 'galleryData.ts'), tsContent);
  console.log(`Successfully generated gallery with ${mediaManifest.length} pure image items in src/galleryData.ts!`);
}

processMedia();
