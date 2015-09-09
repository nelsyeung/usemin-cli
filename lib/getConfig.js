'use strict';

module.exports = function (configFile) {
	// Default configurations
	var config = {
		uglifyjs: {
		},
		cleancss: {
		},
		htmlmin: {
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
		var content = require(configFile);

		if (content.uglifyjs) {
			config.uglifyjs = content.uglifyjs;
		}

		if (content.cleancss) {
			config.cleancss = content.cleancss;
		}

		if (content.htmlmin) {
			config.htmlmin = content.htmlmin;
		}
	}

	return config;
};
