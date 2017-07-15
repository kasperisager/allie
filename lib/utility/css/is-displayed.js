import {some} from 'bundstreg';
import {Pseudo, css, parents} from 'hoardom';

/**
 * Check if an element is visible by definition of its 'display' CSS property.
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isDisplayed(element, pseudo = Pseudo.DEFAULT) {
  if (css(element, 'display', pseudo) === 'none') {
    return false;
  }

  return !some(parents(element), parent =>
    css(parent, 'display', pseudo) === 'none'
  );
}
