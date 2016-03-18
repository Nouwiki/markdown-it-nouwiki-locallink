'use strict';
/*jshint node:true*/

module.exports = function wikilink_plugin(md, scheme) {
  var oldLinkOpenOverride = md.renderer.rules.link_open;
  var oldImgOpenOverride = md.renderer.rules.image;

  var head = "";
  var tail = "";
  if (scheme != undefined) {
    head = scheme.head;
    tail = scheme.tail;
  }

  //scheme = scheme || 'http://'; // what is this doing here?

  md.renderer.rules.link_open = function(tokens, idx, options, env, self) {
    var hrefIndex = tokens[idx].attrIndex('href');
    var href = tokens[idx].attrs[hrefIndex][1];

    if (!(hrefIndex >= 0 && href == "")) {
      if (href.indexOf("/") == 0) {
        tokens[idx].attrs[hrefIndex][1] = head+href+tail;
      }
    }

    if (oldLinkOpenOverride) {
     return oldLinkOpenOverride.apply(self, arguments);
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

    if (oldImgOpenOverride) {
     return oldImgOpenOverride.apply(self, arguments);
    }
    else {
      // There was no previous renderer override. Just call the default.
      return self.renderToken.apply(self, arguments);
    }
  };
};
