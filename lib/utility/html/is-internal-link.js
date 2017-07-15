import {Cache, prop, has} from 'hoardom';

const IS_INTERNAL_LINK = Symbol('isInternalLink');

/**
 * Check if a link is internal within a context, i.e. references a fragment
 * within the context.
 *
 * @see https://html.spec.whatwg.org/multipage/browsers.html#scroll-to-fragid
 *
 * @param {Element} context
 * @param {String} link
 * @param {Function} [URL=window.URL]
 * @return {Boolean}
 */
export default function isInternalLink(link, context, URL = window.URL) {
  return context.lazy(IS_INTERNAL_LINK,
    () => new Cache(new Map()),
    cache => cache.get(link, () => {
      const url = new URL(link);
      const base = new URL(prop(context, 'baseURI'));
      const ref = url.hash.substring(1);

      return (
        url.hostname === base.hostname &&
        url.pathname === base.pathname &&
        has(context, `[id="${decodeURI(ref)}"], a[name="${ref}"]`)
      );
    })
  );
}
