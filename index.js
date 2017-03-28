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
		},
		'listblocks': {
			default: 'false',
			describe: ('Write blocks to stdout or filename.json.\n' +
				'E.g., --listblocks\n.' +
				'     --listblocks blocks.json'),
			type: 'string'
		}
	})
	.demand(1)
	.argv;
var fs = require('fs');
var usemin = require('usemin');

var html = usemin(argv._[0], argv.dest, {
	output: argv.o,
	configFile: argv.c,
	htmlmin: argv.htmlmin,
	noprocess: argv.noprocess,
	removeLivereload: argv.removeLivereload,
});

if (argv.listblocks !== 'false') {
	var content = fs.readFileSync(argv._[0]).toString();
	var blocks = JSON.stringify(usemin.getBlocks(argv._[0], content, argv.removeLivereload),
		null, '  ');

	if (argv.listblocks === '') {
		console.log(blocks);
	} else {
		fs.writeFile(argv.listblocks, blocks, function (err) {
				if (err) {
					return console.error(err);
				}
			});
	}
}

if (!argv.o) {
	console.log(html);
}
