import {trim, some} from 'bundstreg';
import {prop, css, children} from 'hoardom';

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
      const hasDirectText = some(prop(element, 'childNodes'), child =>
        child.nodeType === 3 && trim(child.nodeValue) !== ''
      );

      if (hasDirectText) {
        return true;
      }

      const hasInlineText = some(children(element), child =>
        css(child, 'display') === 'inline' && hasText(child)
      );

      return hasInlineText;
    }
  );
}
