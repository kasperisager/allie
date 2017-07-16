let cache;

/**
 * Get the HTTP headers for the current document.
 *
 * NB: This function will make a new request to the current location in order to
 * fetch headers. Depending on the server, the headers might therefore not be
 * exactly equal to the headers resulting from the initial request.
 *
 * @return {Promise<Headers>}
 */
export default function headers() {
  if (!cache) {
    const request = new Request(location.href, {
      method: 'HEAD',
      mode: 'same-origin',
      credentials: 'same-origin',
      redirect: 'follow'
    });

    cache = fetch(request).then(response => response.headers);
  }

  return cache;
}
