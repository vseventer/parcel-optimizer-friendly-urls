"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _plugin = require("@parcel/plugin");

var _posthtml = _interopRequireDefault(require("posthtml"));

var _posthtmlUrls = _interopRequireDefault(require("posthtml-urls"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Package modules.
// Configure.
const stripIndexHtml = (startsWith, url) => {
  // Verify the URL is our own.
  if (url.indexOf(startsWith) === 0 && url.slice(-11) === '/index.html') {
    return url.slice(0, -10); // Keep trailing slash.
  }

  return url; // Return original URL.
}; // Exports.


var _default = new _plugin.Optimizer({
  async optimize({
    bundle,
    contents,
    map,
    options
  }) {
    // Disable in hot mode because wrong index.html might be served.
    // @see https://github.com/parcel-bundler/parcel/issues/4740
    if (options.hot) {
      return {
        contents,
        map
      };
    }

    const {
      publicUrl
    } = bundle.target;
    const plugin = (0, _posthtmlUrls.default)({
      eachURL: stripIndexHtml.bind(null, publicUrl)
    });
    return {
      contents: (await (0, _posthtml.default)([plugin]).process(contents)).html
    };
  }

});

exports.default = _default;