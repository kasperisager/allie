import {some} from 'bundstreg';
import {Pseudo, parents} from 'hoardom';
import opacity from './opacity';

/**
 * Check if an element is opaque by definition of its 'opacity' CSS property.
 *
 * @see https://www.w3.org/TR/css3-color/#opacity
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isOpaque(element, pseudo = Pseudo.DEFAULT) {
  if (opacity(element, pseudo) !== 1) {
    return false;
  }

  return !some(parents(element), parent =>
    opacity(parent, pseudo) !== 1
  );
}
