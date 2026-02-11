// generate-files-list.js
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

const rootDir = path.resolve(__dirname, '.'); // adjust to your output folder
const files = fs.readdirSync(rootDir);

const manifest = files.map(file => {
  const filePath = path.join(rootDir, file);
  if (fs.statSync(filePath).isFile()) {
    const content = fs.readFileSync(filePath);
    const hash = crypto.createHash('md5').update(content).digest('hex');
    return { url: `/${file}`, revision: hash };
  }
}).filter(Boolean);

fs.writeFileSync(
  path.join(rootDir, 'files-list.json'),
  JSON.stringify(manifest, null, 2)
);

console.log('files-list.json generated with', manifest.length, 'entries');
