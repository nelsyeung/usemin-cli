'use strict';
var HTMLMinifier = require('html-minifier').minify;

module.exports = function (content, blocks, minifyHTML) {
	var linefeed = /\r\n/g.test(content) ? '\r\n' : '\n';

	blocks.forEach(function (block) {
		var blockLines = block.raw.join(linefeed);

		if (block.type === 'js') {
			var defer = block.defer ? 'defer ' : '';
			var async = block.async ? 'async ' : '';

			content = content.replace(blockLines, block.indent + '<script ' + defer + async + 'src="' + block.dest + '"><\/script>');
		}
		else if (block.type === 'css') {
			content = content.replace(blockLines, block.indent + '<link rel="stylesheet" href="' + block.dest + '">');
		}
		else if (block.type === 'livereload') {
			content = content.replace(blockLines + linefeed, '');
		}
	});

	if (minifyHTML) {
		content = HTMLMinifier(content, {
			removeComments: true,
			collapseWhitespace: true,
			removeEmptyAttributes: true,
			removeScriptTypeAttributes: true,
			removeStyleLinkTypeAttributes: true,
			minifyJS: true,
			minifyCSS: true,
		});
	}

	return content;
};
