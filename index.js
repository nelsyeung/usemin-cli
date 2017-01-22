'use strict';
var argv = require('yargs')
	.usage('Usage: usemin [input.html] [--dest|-d dir] [--output|-o output.html] [options]')
	.example('usemin src/index.html -d dist -o dist/index.html', '')
	.example('usemin src/index.html -d dist > dist/index.html', '')
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

var html = require('usemin')(argv._[0], argv.dest, {
	output: argv.o,
	configFile: argv.c,
	htmlmin: argv.htmlmin,
	noprocess: argv.noprocess,
	removeLivereload: argv.removeLivereload,
});

if (!argv.o) {
	console.log(html);
}
