import {toLower} from 'bundstreg';
import {attr} from 'hoardom';
import isDisplayed from '../css/is-displayed';
import isVisible from '../css/is-visible';

/**
 * Check if an element is perceivable to assistive technology.
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isPerceivable(element) {
  const isHidden = toLower(attr(element, 'aria-hidden')) === 'true';

  // An element is perceivable to assitive technology if the element is not
  // explicitly hidden via `aria-hidden` and is both displayed and visible by
  // definition of the corresponding CSS properties.
  return !isHidden && isDisplayed(element) && isVisible(element);
}
