'use strict';
/*jshint node:true*/

module.exports = function wikilink_plugin(md, scheme) {
  var oldLinkOpenOverride = md.renderer.rules.link_open;

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
};
