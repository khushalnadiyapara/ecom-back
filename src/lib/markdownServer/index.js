const path = require('path');
const fs = require('fs');

function server(folderPath) {
  function middleware(req, res, next) {
    if (req.url === '/') {
      res.redirect(`${req.baseUrl}/index.md`);
      return null;
    }
    const filePath = path.join(folderPath, req.url);
    if (!fs.existsSync(filePath)) {
      res.status(404).send('File not found');
      return null;
    }

    // Handle JS and CSS files directly

    if (filePath.endsWith('.js')) {
      res.setHeader('Content-Type', 'application/javascript');
      return res.send(fs.readFileSync(filePath));
    }
    if (filePath.endsWith('.css')) {
      res.setHeader('Content-Type', 'text/css');
      return res.send(fs.readFileSync(filePath));
    }

    const fileContent = fs.readFileSync(filePath, 'utf8');

    const htmlCode = `
        <!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>PG Docs</title>
          <link rel="stylesheet" href="/docs/style/bash.css">
          <link id="theme-css" rel="stylesheet" href="/docs/style/theme/default.css">
        </head>
        <body>
            <div class="md-file-header-container">
              <select id="theme-selector" name="theme"></select>
            </div>

            <article id="content" class="markdown-body"></article>

            <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>

            <script>
              const markdownData = \`${fileContent.replace(/`/g, '\\`')}\`;
              document.addEventListener('DOMContentLoaded', () => {
                const htmlContent = marked.parse(markdownData);
                document.getElementById('content').innerHTML = htmlContent;
              });
            </script>

            <script src="/docs/js/main.js"></script>
        </body>
        </html>
    `;
    return res.send(htmlCode);
  }

  return middleware;
}

module.exports = server;
