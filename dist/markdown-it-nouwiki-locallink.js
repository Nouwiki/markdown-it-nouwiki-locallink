/*! markdown-it-nouwiki-locallink 0.1.0 https://github.com//01AutoMonkey/markdown-it-nouwiki-locallink @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitNouwikiWikiLink = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';
/*jshint node:true*/

module.exports = function local_plugin(md, options) {
  var originalRuleLink = md.renderer.rules.link_open;
  var originalRuleImage = md.renderer.rules.image;

  var head = "";
  var tail = "";
  if (options != undefined) {
    head = options.head;
    tail = options.tail;
  }

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var hrefIndex = tokens[idx].attrIndex('href');
    var href = tokens[idx].attrs[hrefIndex][1];

    if (!(hrefIndex >= 0 && href == "")) {
      if (href.indexOf("/") == 0) {
        tokens[idx].attrs[hrefIndex][1] = head+href+tail;
      }
    }

    if (originalRuleLink) {
     return originalRuleLink.apply(self, arguments);
    }
    else {
      // There was no previous renderer override. Just call the default.
      return self.renderToken.apply(self, arguments);
    }
  };

  md.renderer.rules.image = function(tokens, idx, options, env, self) {
    var srcIndex = tokens[idx].attrIndex('src');
    var src = tokens[idx].attrs[srcIndex][1];

    if (!(srcIndex >= 0 && src == "")) {
      if (src.indexOf("/") == 0) {
        tokens[idx].attrs[srcIndex][1] = head+src+tail;
      }
    }

    if (originalRuleImage) {
     return originalRuleImage.apply(self, arguments);
    }
    else {
      // There was no previous renderer override. Just call the default.
      return self.renderToken.apply(self, arguments);
    }
  };
};

},{}]},{},[1])(1)
});