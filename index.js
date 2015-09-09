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
		},
		'noprocess': {
			default: false,
			describe: 'Do not process files, just replace references',
			type: 'boolean'
		},
		'c': {
			alias: 'config',
			describe: 'Config file for UglifyJS, CleanCSS and htmlmin',
			type: 'string'
		}
	})
	.demand(1)
	.argv;

var fs = require('fs');
var getBlocks = require('./lib/getBlocks');
var getConfig = require('./lib/getConfig');
var processBlocks = require('./lib/processBlocks');
var getHTML = require('./lib/getHTML');

var filePath = argv._[0];
var content = fs.readFileSync(filePath).toString();
var blocks = getBlocks(argv._[0], content, argv.removeLivereload);
var config = getConfig(argv.c);
var process = (argv.noprocess === true) ? true : processBlocks(blocks, argv.dest, config);
var output = getHTML(content, blocks, argv.htmlmin, config);

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
