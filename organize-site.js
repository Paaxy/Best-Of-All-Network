const fs = require('fs');
const path = require('path');

// Run from repository root: node organize-site.js
const root = process.cwd();

const folderMap = {
  html: 'pages',
  css: 'assets/styles',
  js: 'assets/scripts',
  png: 'assets/images',
  jpg: 'assets/images',
  jpeg: 'assets/images',
  svg: 'assets/images',
  mp4: 'assets/media',
  php: 'pages',
  xml: 'data',
  txt: 'docs',
};

const skipNames = new Set(['organize-site.js', 'README.md', 'LICENSE', '.gitignore', '.env', 'website.properties', 'sitemap.xml', 'robots.txt', 'manifest.json', 'service-worker.js', 'sw.js', 'workbox-config.js', 'workbox-d5989aac.js', 'workbox-d5989aac.js.map']);

const findFiles = (base) => {
  const out = [];
  for (const entry of fs.readdirSync(base, { withFileTypes: true })) {
    // keep hidden and internal directories untouched
    if (entry.name === '.git' || entry.name === '_includes' || entry.name === '_redirects' || entry.name.startsWith('.')) continue;
    const full = path.join(base, entry.name);
    if (entry.isDirectory()) {
      // keep nested special dirs, but skip them for moving.
      continue;
    }
    out.push(full);
  }
  return out;
};

const ensureFolder = (folder) => {
  if (!fs.existsSync(folder)) fs.mkdirSync(folder, { recursive: true });
};

const keepRelative = (targetPath) => targetPath.replace(/\\/g, '/');

const files = findFiles(root);

console.log('Found', files.length, 'top-level files');

for (const full of files) {
  const name = path.basename(full);
  if (skipNames.has(name)) continue;
  const ext = path.extname(name).replace('.', '').toLowerCase();
  const destFolder = folderMap[ext] || 'assets/others';
  const target = path.join(root, destFolder, name);
  ensureFolder(path.dirname(target));

  console.log(`Moving ${name} -> ${destFolder}`);
  fs.renameSync(full, target);
}

const rewritePaths = (filePath) => {
  let text = fs.readFileSync(filePath, 'utf8');

  const replacements = [
    // global HTML/JS/CSS references
    { from: /href="(\.\/?)(main|about|entertainment|updateslog|tools|calc|chatroom|login|information|snake|tic-tac-toe|Pong|SHOOTER|dvdscreensaver|minicraft|questsgame|dinogame|cargame|aliengame|3dflappybird|2042game|SCRATCH SCREENSAVER|congratulations|test|ufo|chess)\.html"/gi, to: 'href="/pages/$2.html"' },
    { from: /src="(main|about|entertainment|updateslog|tools|calc|chatroom|login|information|snake|tic-tac-toe|Pong|SHOOTER|dvdscreensaver|minicraft|questsgame|dinogame|cargame|aliengame|3dflappybird|2042game|SCRATCH SCREENSAVER|congratulations|test|chess)\.js"/gi, to: 'src="/assets/scripts/$1.js"' },
    { from: /href="(animations|main|entertainment|minicraft|about|updateslog|resize)\.css"/gi, to: 'href="/assets/styles/$1.css"' },
    { from: /src="(main|entertainment|minicraft|about|updateslog)\.js"/gi, to: 'src="/assets/scripts/$1.js"' }
  ];

  for (const { from, to } of replacements) {
    text = text.replace(from, to);
  }

  fs.writeFileSync(filePath, text, 'utf8');
};

// Rewrite moved HTML files to refer to new assets
const movedHtmlDir = path.join(root, 'pages');
if (fs.existsSync(movedHtmlDir)) {
  for (const file of fs.readdirSync(movedHtmlDir)) {
    if (file.endsWith('.html')) {
      rewritePaths(path.join(movedHtmlDir, file));
    }
  }
}

console.log('Reorganization complete.');
console.log('If you use a local server, restart it and verify pages in /pages, /assets/styles, /assets/scripts');
