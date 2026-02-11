module.exports = {
	globDirectory: 'C:\Users\paax0\Best-Of-All---NETWORK',
	globPatterns: [
		'**/*.{js,properties,css,html,txt,md,png,xml,mp4,json,php,csv,code-workspace,njk,cs}'
	],
	swDest: 'C:/Users/paax0/Best-Of-All---NETWORK/sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};

additionalManifestEntries: [
    { url: '/files-list.json', revision: null }
  ]

