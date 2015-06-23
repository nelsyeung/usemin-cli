'use strict';
var argv = require('yargs')
	.usage('Usage: $0 [input.html] [--dest|-d dir] [--output|-o output.html]')
	.example('usemin src/index.html -d dist -o dist/index.html')
	.example('usemin src/index.html -d dist > dist/index.html')
	.alias('d', 'dest')
	.describe('d', 'Output directory for compressed output files')
	.demand('d', 'Please specify the output directory')
	.alias('o', 'output')
	.describe('o', 'HTML output file')
	.demand(1)
	.argv;

var fs = require('fs');
var getBlocks = require('./lib/getBlocks');
var processBlocks = require('./lib/processBlocks');
var getHTML = require('./lib/getHTML');

var filePath = argv._[0];
var content = fs.readFileSync(filePath).toString();
var blocks = getBlocks(argv._[0], content);
var process = processBlocks(blocks, argv.d);
var output = getHTML(content, blocks);

if (process) {
	if (argv.o) {
		fs.writeFile(argv.o, output, function(err) {
			if (err) {
				return console.error(err);
			}
		});
	}
	else {
		console.log(output);
	}
}
else {
	console.log('Unexpected error.');
}
