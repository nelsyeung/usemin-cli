'use strict';
var path = require('path');

module.exports = function (src, content) {
	var buildReg = /<!--\s*build:(\w+)(?:\(([^\)]+)\))?\s*([^\s]+)\s*-->/;
	var endReg = /<!--\s*endbuild\s*-->/;

	var lines = content.replace(/\r\n/g, '\n').split(/\n/);
	var inBlock = false;
	var block;
	var blocks = [];
	var srcDir = path.dirname(src);

	lines.forEach(function (l) {
		var indent = (l.match(/^\s*/) || [])[0];
		var build = l.match(buildReg);
		var endbuild = endReg.test(l);

		if (build) {
			inBlock = true;
			block = {
				type: build[1],
				dest: build[3],
				indent: indent,
				src: [],
				raw: []
			};
		}

		// switch back block flag when endbuild
		if (inBlock && endbuild) {
			block.raw.push(l);
			blocks.push(block);
			inBlock = false;
		}

		if (inBlock) {
			var asset = l.match(/(href|src)=["']([^'"]+)["']/);

			if (asset && asset[2]) {
				block.src.push(path.join(srcDir, asset[2]));
			}

			block.raw.push(l);
		}
		else {
		}
	});

	return blocks;
};
