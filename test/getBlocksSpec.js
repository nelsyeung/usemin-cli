'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var getBlocks = require('../lib/getBlocks');

describe('Get Blocks', function () {
	it('should get JS block', function () {
		var src = './test/index.html';
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
					'test/js/app.js',
					'test/js/controllers/test.js',
					'test/js/models/test.js',
					'test/js/views/test.js'
				],
				raw: [
					'\t<!-- build:js js/main.js -->',
					'\t<script src="js/app.js"></script>',
					'\t<script src="js/controllers/test.js"></script>',
					'\t<script src="js/models/test.js"></script>',
					'\t<script src="js/views/test.js"></script>',
					'\t<!-- endbuild -->'
				]
			},
			{
				async: true,
				defer: true,
				type: 'js',
				dest: 'js/main.js',
				indent: '\t',
				src: [
					'test/js/app.js',
					'test/js/controllers/test.js',
					'test/js/models/test.js',
					'test/js/views/test.js'
				],
				raw: [
					'\t<!-- build:js js/main.js -->',
					'\t<script defer async src="js/app.js"></script>',
					'\t<script defer async src="js/controllers/test.js"></script>',
					'\t<script defer async src="js/models/test.js"></script>',
					'\t<script defer async src="js/views/test.js"></script>',
					'\t<!-- endbuild -->'
				]
			}
		];

		expect(blocks).to.eql(outcome);
	});
});
