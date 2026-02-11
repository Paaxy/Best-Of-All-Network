module.exports = {
  globDirectory: 'C:/Users/paax0/Best-Of-All---NETWORK',
  globPatterns: [
    '**/*.{js,properties,css,html,txt,md,png,xml,mp4,json,php,csv,code-workspace,njk,cs}'
  ],
  swSrc: './service-worker.js',        // your manual template file
  swDest: './service-worker.js',       // output file (can overwrite same file)
  dontCacheBustURLsMatching: /\.(?:png|jpg|css|js)$/,
  additionalManifestEntries: [
    { url: '/files-list.json', revision: null }
  ]
};
