'use strict';
var fs = require('fs');
var expect = require('chai').expect;
var getBlocks = require('../lib/getBlocks');
var getHTML = require('../lib/getHTML');
var inputsDir = 'test/files/';

describe('Get HTML', function () {
	it('should get HTML correctly', function () {
		var src = inputsDir + 'index.html';
		var content = fs.readFileSync(src).toString();
		var outcome = fs.readFileSync(inputsDir + 'outcome.html').toString();
		var blocks = getBlocks(src, content, true);
		var html = getHTML(content, blocks, false);

		expect(html).to.eql(outcome);
	});

	it('should get minified HTML correctly', function () {
		var src = inputsDir + 'index.html';
		var content = fs.readFileSync(src).toString();
		var outcome = fs.readFileSync(inputsDir + 'htmlmin.html').toString();
		var blocks = getBlocks(src, content, true);
		var html = getHTML(content, blocks, true);

		expect(html + '\n').to.equal(outcome);
	});
});
