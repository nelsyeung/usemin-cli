'use strict';
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var UglifyJS = require('uglify-js');
var CleanCSS = require('clean-css');

module.exports = function (blocks, destDir, config) {
	blocks.forEach(function (block) {
		if (block.type === 'js') {
			var js = UglifyJS.minify(block.src, config.uglifyjs);

			mkdirp(path.dirname(path.join(destDir, block.dest)), function (err) {
				if (!err) {
					fs.writeFile(path.join(destDir, block.dest), js.code, function(err) {
						if (err) {
							throw Error(err);
						}
					});
				}
			});
		}
		else if (block.type === 'css') {
			var css = '';

			block.src.forEach(function (src) {
				css += fs.readFileSync(src);
			});

			css = new CleanCSS(config.cleancss).minify(css).styles;

			mkdirp(path.dirname(path.join(destDir, block.dest)), function (err) {
				if (!err) {
					fs.writeFile(path.join(destDir, block.dest), css, function(err) {
						if (err) {
							throw Error(err);
						}
					});
				}
			});
		}
		else if (block.type === 'livereload') {
		}
		else {
			throw Error('Unsupport format: ' + block.type);
		}
	});

	return true;
};
