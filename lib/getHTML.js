'use strict';
module.exports = function (content, blocks) {
	var linefeed = /\r\n/g.test(content) ? '\r\n' : '\n';

	blocks.forEach(function (block) {
		var blockLines = block.raw.join(linefeed);

		content = content.replace(blockLines, block.indent + '<script src="' + block.dest + '"><\/script>');
	});

	return content;
};
