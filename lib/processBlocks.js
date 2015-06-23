'use strict';
var fs = require('fs');
var path = require('path');
var mkdirp = require('mkdirp');
var UglifyJS = require('uglify-js');

module.exports = function (blocks, destDir) {
	blocks.forEach(function (block) {
		if (block.type === 'js') {
			var output = UglifyJS.minify(block.src);

			mkdirp(path.dirname(path.join(destDir, block.dest)), function (err) {
				if (!err) {
					fs.writeFile(path.join(destDir, block.dest), output.code, function(err) {
						if (err) {
							console.error(err);
							return false;
						}
					});
				}
			});
		}
		else if (block.type === 'css') {
		}
		else {
			console.error('Unsupport format: ' + block.type);
			return false;
		}
	});

	return true;
};
