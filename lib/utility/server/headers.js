import {prop} from 'hoardom';

const CACHE = new WeakMap();

/**
 * Get the HTTP headers for the current document.
 *
 * NB: This function will make a new request to the context location in order to
 * fetch headers. Depending on the server, the headers might therefore not be
 * exactly equal to the headers resulting from the initial request.
 *
 * @param {Element} [context]
 * @return {Promise<Headers>}
 */
export default function headers(context) {
  let view = window;

  if (context) {
    const document = prop(context, 'ownerDocument');

    if (document) {
      view = document.defaultView;
    }
  }

  if (!CACHE.has(view)) {
    const request = new Request(view.location.href, {
      method: 'HEAD',
      mode: 'same-origin',
      credentials: 'same-origin',
      redirect: 'follow'
    });

    CACHE.set(view, fetch(request).then(response => response.headers));
  }

  return CACHE.get(view);
}
