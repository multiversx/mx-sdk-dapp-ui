#!/usr/bin/env node

const fs = require('fs').promises;
const path = require('path');

async function findFiles(dir: string, extensions: string[]): Promise<string[]> {
  const files: string[] = [];

  async function scan(currentDir: string): Promise<void> {
    const items = await fs.readdir(currentDir, { withFileTypes: true });

    for (const item of items) {
      const fullPath = path.join(currentDir, item.name);

      if (item.isDirectory() && !['node_modules', 'dist'].includes(item.name)) {
        await scan(fullPath);
      } else if (item.isFile()) {
        const ext = path.extname(item.name).slice(1);
        if (extensions.includes(ext)) {
          files.push(fullPath);
        }
      }
    }
  }

  await scan(dir);
  return files;
}

async function main(): Promise<void> {
  const sourceDir = 'src';
  const outputPath = '.storybook/tailwind-safelist.html';
  const utilityPrefix = 'mvx:';

  // Find all SCSS and CSS files
  const files = await findFiles(sourceDir, ['scss', 'css']);

  const utilities = new Set<string>();

  // Process each file
  for (const filePath of files) {
    const content = await fs.readFile(filePath, 'utf-8');

    // Find all @apply lines
    const lines = content.split('\n');

    for (const line of lines) {
      const trimmed = line.trim();
      if (trimmed.includes('@apply')) {
        // Extract everything after @apply
        const applyIndex = trimmed.indexOf('@apply');
        const afterApply = trimmed.substring(applyIndex + 6);

        // Remove semicolon and split by whitespace
        const classes = afterApply.replace(';', '').split(' ');

        // Add classes that start with our prefix
        for (const cls of classes) {
          const cleaned = cls.trim();
          if (cleaned.startsWith(utilityPrefix) && cleaned.length > utilityPrefix.length) {
            utilities.add(cleaned);
          }
        }
      }
    }
  }

  // Generate HTML safelist
  const sortedUtilities = Array.from(utilities).sort();
  const htmlContent = `<div class="${sortedUtilities.join(' ')}"></div>\n`;

  await fs.mkdir(path.dirname(outputPath), { recursive: true });
  await fs.writeFile(outputPath, htmlContent, 'utf-8');

  console.log(`Generated safelist with ${utilities.size} utilities`);
}

main().catch(console.error);
