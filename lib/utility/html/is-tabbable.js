import {prop} from 'hoardom';
import isDisplayed from '../css/is-displayed';
import isVisible from '../css/is-visible';
import isEnabled from './is-enabled';

/**
 * Check if an element is tabbable, i.e. reachable through programmatic focus
 * management AND sequential keyboard navigation.
 *
 * NB: This function relies on the tabindex reported by the browser in order to
 * determine if an element is tabbable and will NOT make an attempt to correct
 * the reported values in cases where they might be incorrect.
 *
 * @see https://html.spec.whatwg.org/multipage/interaction.html#suitable-sequentially-focusable-area
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isTabbable(element) {
  if (!isVisible(element)) {
    return false;
  }

  if (!isEnabled(element)) {
    return false;
  }

  if (!isDisplayed(element)) {
    return false;
  }

  return prop(element, 'tabIndex') >= 0;
}
