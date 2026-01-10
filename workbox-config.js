module.exports = {
	globDirectory: '.',
	globPatterns: [
		'**/*.{js,css,html,txt,png,mp4,md,json,xml,csv,code-workspace}'
	],
	swDest: 'sw.js',
	ignoreURLParametersMatching: [
		/^utm_/,
		/^fbclid$/
	]
};