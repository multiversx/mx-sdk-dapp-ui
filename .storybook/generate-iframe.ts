const fileSystem = require('fs');
const filePath = require('path');

function generateIframe(): void {
  const iframePath = filePath.join(__dirname, '../storybook-static/iframe.html');
  const indexPath = filePath.join(__dirname, '../storybook-static/index.html');

  if (fileSystem.existsSync(iframePath)) {
    return;
  }

  if (!fileSystem.existsSync(indexPath)) {
    process.exit(1);
  }

  const indexContent = fileSystem.readFileSync(indexPath, 'utf8');
  const iframeContent = indexContent
    .replace(/<title>.*?<\/title>/, '<title>Storybook Preview</title>')
    .replace(/<!--\s*Storybook manager.*?-->/g, '')
    .replace(
      /<div id="storybook-manager-root">[\s\S]*?<\/div>/,
      '<div id="storybook-root"></div><div id="docs-root"></div>',
    );

  fileSystem.writeFileSync(iframePath, iframeContent);
}

generateIframe();
