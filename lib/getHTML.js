'use strict';
module.exports = function (content, blocks) {
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
	});

	return content;
};
