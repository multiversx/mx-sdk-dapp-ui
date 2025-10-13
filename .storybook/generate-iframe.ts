const fileSystem = require('fs');
const filePath = require('path');

function generateIframe(): void {
  const iframePath = filePath.join(__dirname, '../storybook-static/iframe.html');

  if (fileSystem.existsSync(iframePath)) {
    return;
  }

  const iframeContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>Storybook Preview</title>
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <link rel="icon" type="image/svg+xml" href="./favicon.svg" />

  <style>
    body {
      margin: 0;
      padding: 0;
    }
    #storybook-root {
      height: 100vh;
      overflow: auto;
    }
  </style>

  <script type="module" src="./index.js"></script>
</head>
<body>
  <div id="storybook-root"></div>
  <div id="docs-root"></div>
</body>
</html>`;

  fileSystem.writeFileSync(iframePath, iframeContent);
}

generateIframe();
