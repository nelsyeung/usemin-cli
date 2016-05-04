module.exports = {
	uglifyjs: {
		outSourceMap: 'minified.js.map',
		warnings: true,
		mangle: true,
		compress: {
			loops: true,
			unused: true
		}
	},
	cleancss: {
		advanced: true,
		keepBreaks: true,
		rebase: false
	},
	htmlminifier: {
		removeComments: true,
		collapseWhitespace: true,
		removeEmptyAttributes: true,
		removeScriptTypeAttributes: true,
		removeStyleLinkTypeAttributes: true,
		minifyJS: false,
		minifyCSS: false,
	}
};
