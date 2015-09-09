'use strict';

module.exports = function (configFile) {
	// Default configurations
	var config = {
		uglifyjs: {
		},
		cleancss: {
		},
		htmlminifier: {
			removeComments: true,
			collapseWhitespace: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			minifyJS: true,
			minifyCSS: true,
		}
	};

	if (configFile) {
		var content = require(process.cwd() + '/' + configFile);

		if (content.uglifyjs) {
			config.uglifyjs = content.uglifyjs;
		}

		if (content.cleancss) {
			config.cleancss = content.cleancss;
		}

		if (content.htmlminifier) {
			config.htmlminifier = content.htmlminifier;
		}
	}

	return config;
};
