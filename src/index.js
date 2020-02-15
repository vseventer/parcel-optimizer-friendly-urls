// Package modules.
import { Optimizer } from '@parcel/plugin';
import posthtml from 'posthtml';
import urls from 'posthtml-urls';

// Configure.
const stripIndexHtml = (startsWith, url) => {
  // Verify the URL is our own.
  if (url.indexOf(startsWith) === 0 && url.slice(-11) === '/index.html') {
    return url.slice(0, -10); // Keep trailing slash.
  }
  return url; // Return original URL.
};

// Exports.
export default new Optimizer({
  async optimize({ bundle, contents }) {
    const { publicUrl } = bundle.target;
    const plugin = urls({ eachURL: stripIndexHtml.bind(null, publicUrl) });
    return {
      contents: (await posthtml([plugin]).process(contents)).html
    };
  }
});
