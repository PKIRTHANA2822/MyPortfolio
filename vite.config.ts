import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

function autoScanProjectImagesPlugin() {
  const projectsDir = fileURLToPath(new URL('./public/projects', import.meta.url));
  const targetFile = fileURLToPath(new URL('./src/projectImages.ts', import.meta.url));
  const folderMap = {
    '01': 'behavioural-safety',
    '04': 'chemical-safety',
    '05': 'cybersecurity',
  };
  const imageExtensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif']);
  const videoExtensions = new Set(['.mp4', '.mov', '.webm', '.mkv', '.avi']);

  const scan = () => {
    try {
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
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

        const videoFiles = files
          .filter((file) => videoExtensions.has(path.extname(file).toLowerCase()))
          .sort((a, b) => a.localeCompare(b, undefined, { numeric: true, sensitivity: 'base' }));

        imagesResult[projectId] = imageFiles.map((file) => `/projects/${folderName}/${file}`);
        videosResult[projectId] = videoFiles.map((file) => `/projects/${folderName}/${file}`);
      }

      if (videosResult['01'].length === 0) {
        videosResult['01'] = Array.from({ length: 7 }, (_, i) => `/projects/behavioural-safety/${i + 1}.mp4`);
      }
      if (videosResult['05'].length === 0) {
        videosResult['05'] = Array.from({ length: 7 }, (_, i) => `/projects/cybersecurity/${i + 1}.mp4`);
      }
      imagesResult['01'] = [];
      imagesResult['05'] = [];

      const content = `// Auto-generated project media manifest (Images & Multi-Videos)
// Automatically updated by Vite plugin & npm run sync-projects
export const PROJECT_SLIDES: Record<string, string[]> = ${JSON.stringify(imagesResult, null, 2)};

export const PROJECT_VIDEOS: Record<string, string[]> = ${JSON.stringify(videosResult, null, 2)};
`;
      fs.writeFileSync(targetFile, content, 'utf-8');
    } catch (err) {
      console.error('Error scanning project media:', err);
    }
  };

  return {
    name: 'auto-scan-project-images',
    buildStart() {
      scan();
    },
    configureServer(server) {
      server.watcher.add(projectsDir);
      server.watcher.on('add', (filePath) => {
        if (filePath.includes('projects')) scan();
      });
      server.watcher.on('unlink', (filePath) => {
        if (filePath.includes('projects')) scan();
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), autoScanProjectImagesPlugin()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  optimizeDeps: {
    exclude: ['lucide-react'],
  },
});
