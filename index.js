'use strict';
var argv = require('yargs')
	.usage('Usage: usemin [input.html] [--dest|-d dir] [--output|-o output.html] [options]')
	.example('usemin src/index.html -d dist -o dist/index.html')
	.example('usemin src/index.html -d dist > dist/index.html')
	.options({
		'd': {
			alias: 'dest',
			demand: 'Please specify the output directory',
			describe: 'Output directory for compressed output files',
			type: 'string'
		},
		'o': {
			alias: 'output',
			describe: 'HTML output file',
			type: 'string'
		},
		'htmlmin': {
			default: false,
			describe: 'Also minifies the input HTML file',
			type: 'boolean'
		},
		'rmlr': {
			alias: 'removeLivereload',
			default: false,
			describe: 'Remove livereload script',
			type: 'boolean'
		}
	})
	.demand(1)
	.argv;

var fs = require('fs');
var getBlocks = require('./lib/getBlocks');
var processBlocks = require('./lib/processBlocks');
var getHTML = require('./lib/getHTML');

var filePath = argv._[0];
var content = fs.readFileSync(filePath).toString();
var blocks = getBlocks(argv._[0], content, argv.removeLivereload);
var process = processBlocks(blocks, argv.dest);
var output = getHTML(content, blocks, argv.htmlmin);

if (process) {
	if (argv.o) {
		fs.writeFile(argv.o, output, function(err) {
			if (err) {
				throw Error(err);
			}
		});
	}
	else {
		console.log(output);
	}
}
else {
	throw Error('Unexpected error.');
}
