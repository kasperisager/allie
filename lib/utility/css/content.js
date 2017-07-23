import {split, join, trim, filter} from 'bundstreg';
import {Cache, prop} from 'hoardom';

const CONTENT = Symbol('content');

const STRING = /'(.+?)'|"(.+?)"/;

export const BEFORE = ':before';
export const AFTER = ':after';

/**
 * Get the textual CSS content of an element.
 *
 * @param {Element} element
 * @param {String} [pseudo=null]
 * @return {String}
 */
export default function content(element, pseudo = null) {
  return element.lazy(CONTENT, () => new Cache(new Map()),
    cache => cache.get(pseudo, () => {
      const view = prop(element, 'ownerDocument').defaultView;
      const style = view.getComputedStyle(element.node, pseudo);

      const {content} = style;

      const strings = filter(split(content, STRING), trim);

      return join(strings, '');
    })
  );
}
