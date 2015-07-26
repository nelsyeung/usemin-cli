'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var getBlocks = require('../lib/getBlocks');
var inputDir = 'test/files/';

describe('Get Blocks', function () {
	it('should get JS block', function () {
		var src = inputDir + 'js.html';
		var content = fs.readFileSync(src).toString();
		var blocks = getBlocks(src, content);
		var outcome = [
			{
				async: false,
				defer: false,
				type: 'js',
				dest: 'js/main.js',
				indent: '\t',
				src: [
					inputDir + 'js/app.js',
					inputDir + 'js/models.js',
					inputDir + 'js/views.js',
					inputDir + 'js/controllers.js'
				],
				raw: [
					'\t<!-- build:js js/main.js -->',
					'\t<script src="js/app.js"></script>',
					'\t<script src="js/models.js"></script>',
					'\t<script src="js/views.js"></script>',
					'\t<script src="js/controllers.js"></script>',
					'\t<!-- endbuild -->'
				]
			},
		];

		expect(blocks).to.eql(outcome);
	});

	it('should get defer and async JS block', function () {
		var src = inputDir + 'defer-async.html';
		var content = fs.readFileSync(src).toString();
		var blocks = getBlocks(src, content);
		var outcome = [
			{
				async: true,
				defer: true,
				type: 'js',
				dest: 'js/main.js',
				indent: '\t',
				src: [
					inputDir + 'js/app.js',
					inputDir + 'js/models.js',
					inputDir + 'js/views.js',
					inputDir + 'js/controllers.js'
				],
				raw: [
					'\t<!-- build:js js/main.js -->',
					'\t<script defer async src="js/app.js"></script>',
					'\t<script defer async src="js/models.js"></script>',
					'\t<script defer async src="js/views.js"></script>',
					'\t<script defer async src="js/controllers.js"></script>',
					'\t<!-- endbuild -->'
				]
			}
		];

		expect(blocks).to.eql(outcome);
	});

	it('should get CSS block', function () {
		var src = inputDir + 'css.html';
		var content = fs.readFileSync(src).toString();
		var blocks = getBlocks(src, content);
		var outcome = [
			{
				async: false,
				defer: false,
				type: 'css',
				dest: 'css/main.js',
				indent: '\t',
				src: [
					inputDir + 'css/main.css',
					inputDir + 'css/test.css',
				],
				raw: [
					'\t<!-- build:css css/main.js -->',
					'\t<link rel="stylesheet" href="css/main.css">',
					'\t<link rel="stylesheet" href="css/test.css">',
					'\t<!-- endbuild -->'
				]
			}
		];

		expect(blocks).to.eql(outcome);
	});

	it('should get livereload script', function () {
		var src = inputDir + 'livereload.html';
		var content = fs.readFileSync(src).toString();
		var blocks = getBlocks(src, content, true);
		var outcome = [
			{
				type: 'livereload',
				raw: [
					'\t<script>document.write(\'<script src="http://\' + (location.host || \'localhost\').split(\':\')[0] + \':35729/livereload.js?snipver=1"></\' + \'script>\')</script>'
				]
			}
		];

		expect(blocks).to.eql(outcome);
	});
});
