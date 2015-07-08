'use strict';
module.exports = function (content, blocks) {
	var linefeed = /\r\n/g.test(content) ? '\r\n' : '\n';

	blocks.forEach(function (block) {
		var blockLines = block.raw.join(linefeed);
		var defer = block.defer ? 'defer ' : '';
		var async = block.async ? 'async ' : '';

		content = content.replace(blockLines, block.indent + '<script ' + defer + async + 'src="' + block.dest + '"><\/script>');
	});

	return content;
};
