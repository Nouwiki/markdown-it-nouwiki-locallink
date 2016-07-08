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
