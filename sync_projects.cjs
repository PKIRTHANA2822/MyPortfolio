const fs = require('fs');
const path = require('path');

const projectsDir = path.join(__dirname, 'public', 'projects');
const targetFile = path.join(__dirname, 'src', 'projectImages.ts');

const folderMap = {
  '01': 'behavioural-safety',
  '04': 'chemical-safety',
  '05': 'cybersecurity',
};

const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']);
const videoExtensions = new Set(['.mp4', '.mov', '.webm', '.mkv', '.avi']);

function naturalSort(a, b) {
  return a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' });
}

function scanProjectMedia() {
  const imagesResult = { '01': [], '04': [], '05': [] };
  const videosResult = { '01': [], '04': [], '05': [] };

  for (const [projectId, folderName] of Object.entries(folderMap)) {
    const dirPath = path.join(projectsDir, folderName);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const files = fs.readdirSync(dirPath);

    const imageFiles = files
      .filter((file) => imageExtensions.has(path.extname(file).toLowerCase()))
      .sort(naturalSort);

    const videoFiles = files
      .filter((file) => videoExtensions.has(path.extname(file).toLowerCase()))
      .sort(naturalSort);

    imagesResult[projectId] = imageFiles.map((file) => `/projects/${folderName}/${file}`);
    videosResult[projectId] = videoFiles.map((file) => `/projects/${folderName}/${file}`);
  }

  // Fallback defaults for 01 and 05 if user hasn't added files yet
  if (videosResult['01'].length === 0) {
    videosResult['01'] = Array.from({ length: 7 }, (_, i) => `/projects/behavioural-safety/${i + 1}.mp4`);
  }
  if (videosResult['05'].length === 0) {
    videosResult['05'] = Array.from({ length: 7 }, (_, i) => `/projects/cybersecurity/${i + 1}.mp4`);
  }

  // Clear images for 01 and 05 as requested (images removed, video only)
  imagesResult['01'] = [];
  imagesResult['05'] = [];

  const content = `// Auto-generated project media manifest (Images & Multi-Videos)
// Automatically updated by Vite plugin & npm run sync-projects
export const PROJECT_SLIDES: Record<string, string[]> = ${JSON.stringify(imagesResult, null, 2)};

export const PROJECT_VIDEOS: Record<string, string[]> = ${JSON.stringify(videosResult, null, 2)};
`;

  fs.writeFileSync(targetFile, content, 'utf-8');
  console.log('Project media synced successfully:');
  console.log(`  Project 01 (behavioural-safety): ${videosResult['01'].length} videos`);
  console.log(`  Project 04 (chemical-safety): ${imagesResult['04'].length} images`);
  console.log(`  Project 05 (cybersecurity): ${videosResult['05'].length} videos`);
}

scanProjectMedia();

module.exports = { scanProjectMedia };
