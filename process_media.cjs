const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const sourceDir = path.join(__dirname, 'AI_Task (2)', 'AI_Task');
const outputImagesDir = path.join(__dirname, 'public', 'gallery', 'images');
const outputVideosDir = path.join(__dirname, 'public', 'gallery', 'videos');

if (!fs.existsSync(outputImagesDir)) {
  fs.mkdirSync(outputImagesDir, { recursive: true });
}
if (!fs.existsSync(outputVideosDir)) {
  fs.mkdirSync(outputVideosDir, { recursive: true });
}

function getAllFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      getAllFiles(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }
  return fileList;
}

async function processMedia() {
  const allFiles = getAllFiles(sourceDir);
  console.log(`Found ${allFiles.length} files to process.`);

  const mediaManifest = [];
  let imageCounter = 1;
  let videoCounter = 1;

  for (const filePath of allFiles) {
    const ext = path.extname(filePath).toLowerCase();
    const fileName = path.basename(filePath, ext);
    const parentFolder = path.basename(path.dirname(filePath));

    // Handle Images
    if (['.png', '.jpg', '.jpeg', '.webp'].includes(ext)) {
      const cleanName = `${parentFolder.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${fileName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${imageCounter++}.webp`;
      const outPath = path.join(outputImagesDir, cleanName);

      try {
        await sharp(filePath)
          .resize({ width: 1200, height: 1200, fit: 'inside', withoutEnlargement: true })
          .webp({ quality: 85, effort: 5 })
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
        console.log(`Converted: ${path.basename(filePath)} -> ${cleanName}`);
      } catch (err) {
        console.error(`Error converting ${filePath}:`, err.message);
      }
    }
    // Handle Videos
    else if (['.mp4', '.webm', '.mov'].includes(ext)) {
      const cleanName = `${parentFolder.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${fileName.replace(/[^a-zA-Z0-9]/g, '_').toLowerCase()}_${videoCounter++}${ext}`;
      const outPath = path.join(outputVideosDir, cleanName);
      fs.copyFileSync(filePath, outPath);

      const relativeWebPath = `/gallery/videos/${cleanName}`;
      mediaManifest.push({
        id: `vid-${videoCounter}`,
        type: 'video',
        src: relativeWebPath,
        alt: `${parentFolder} - ${fileName}`,
        title: fileName.replace(/[_-]/g, ' '),
        category: parentFolder.replace(/_/g, ' ')
      });
      console.log(`Copied Video: ${path.basename(filePath)} -> ${cleanName}`);
    }
  }

  const tsContent = `// Auto-generated gallery media manifest
export interface GalleryItem {
  id: string;
  type: 'image' | 'video';
  src: string;
  alt: string;
  title: string;
  category: string;
}

export const GALLERY_ITEMS: GalleryItem[] = ${JSON.stringify(mediaManifest, null, 2)};
`;

  fs.writeFileSync(path.join(__dirname, 'src', 'galleryData.ts'), tsContent);
  console.log(`Successfully generated gallery with ${mediaManifest.length} items and manifest in src/galleryData.ts!`);
}

processMedia();
