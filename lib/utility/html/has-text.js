import {trim, some} from 'bundstreg';
import {css, text} from 'hoardom';
import children from './children';
import isText from './is-text';

const HAS_TEXT = Symbol('hasText');

/**
 * Check if an element contains text, either direct or inline.
 *
 * NB: This function does not consider non-inline descendants of an element.
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function hasText(element) {
  return element.lazy(HAS_TEXT,
    () => {
      if (isText(element)) {
        return trim(text(element)) !== '';
      }

      return some(
        children(element, {elements: true, texts: true}),
        child => {
          if (!isText(child) && css(child, 'display') !== 'inline') {
            return false;
          }

          return hasText(child);
        }
      );
    }
  );
}
