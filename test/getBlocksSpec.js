'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var getBlocks = require('../lib/getBlocks');
var inputsDir = 'test/inputs/';

describe('Get Blocks', function () {
	it('should get JS block', function () {
		var src = inputsDir + 'js.html';
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
					inputsDir + 'js/app.js',
					inputsDir + 'js/models.js',
					inputsDir + 'js/views.js',
					inputsDir + 'js/controllers.js'
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
		var src = './test/inputs/defer-async.html';
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
					inputsDir + 'js/app.js',
					inputsDir + 'js/models.js',
					inputsDir + 'js/views.js',
					inputsDir + 'js/controllers.js'
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
		var src = './test/inputs/css.html';
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
					inputsDir + 'css/main.css',
					inputsDir + 'css/test.css',
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
});
