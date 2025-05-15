import * as fs from 'fs';
import * as path from 'path';

function getTSXFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);

  list.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);

    if (stat && stat.isDirectory()) {
      results = results.concat(getTSXFiles(filePath));
    } else if (filePath.endsWith('.tsx')) {
      results.push(filePath);
    }
  });

  return results;
}

function extractTagName(content: string): string | null {
  const tagRegex = /@Component\s*\(\s*{[^}]*tag:\s*['"`]([^'"`]+)['"`][\s\S]*?\}/;
  const match = content.match(tagRegex);
  return match ? match[1] : null;
}

export function getExcludedComponentTags(folderPath: string): string[] {
  const files = getTSXFiles(folderPath);
  const tags: string[] = [];

  files.forEach(file => {
    const content = fs.readFileSync(file, 'utf8');
    const tag = extractTagName(content);
    if (tag) {
      tags.push(tag);
    }
  });

  return tags;
}
