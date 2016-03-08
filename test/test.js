'use strict';
/*jshint node:true*/
/* global describe, it, before, beforeEach, after, afterEach */
/*eslint-env mocha*/

var expect = require('chai').expect;

describe('markdown-it-wikilink', function () {

  it('should add a . only to absolute paths', function() {
    var md = require('markdown-it')().use(require('../'), {"head": ".", "tail": ""});
    var s, target;

    s = '[page](/assets/test.txt)';
    target = '<p><a href="./assets/test.txt">page</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[page](assets/test.txt)';
    target = '<p><a href="assets/test.txt">page</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });

  it('should add a ../.. only to absolute paths', function() {
    var md = require('markdown-it')().use(require('../'), {"head": "../..", "tail": ""});
    var s, target;

    s = '[page](/assets/test.txt)';
    target = '<p><a href="../../assets/test.txt">page</a></p>\n';
    expect(md.render(s)).to.equal(target);

    s = '[page](assets/test.txt)';
    target = '<p><a href="assets/test.txt">page</a></p>\n';
    expect(md.render(s)).to.equal(target);
  });

});
