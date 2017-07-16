import {focus, blur, isFocused} from 'hoardom';
import isTabbable from './is-tabbable';

/**
 * Check if an element is focusable, i.e. reachable through programmatic focus
 * management OR sequential keyboard navigation.
 *
 * @see https://html.spec.whatwg.org/multipage/interaction.html#focusable-area
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isFocusable(element) {
  // First check if the element is tabbable; if this is the case, then the
  // element can also receive programmatic focus.
  if (isTabbable(element)) {
    return true;
  }

  // If the element is not tabbable then we need to move focus programmatically
  // to the element and check if it did indeed receive focus.
  focus(element);

  const focusable = isFocused(element);

  if (focusable) {
    blur(element);
  }

  return focusable;
}
