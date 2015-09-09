'use strict';
var expect = require('chai').expect;
var getConfig = require('../lib/getConfig');
var inputDir = 'test/files/';

describe('Get Config', function () {
	it('should get configurations from file', function () {
		var src = inputDir + 'config';
		var config = getConfig(src);
		var outcome = {
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

		expect(config).to.eql(outcome);
	});

	it('should use default configurations when no file is supplied', function () {
		var config = getConfig(false);
		var outcome = {
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

		expect(config).to.eql(outcome);
	});
});
