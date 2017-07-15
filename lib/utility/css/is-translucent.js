import {Pseudo} from 'hoardom';
import isOpaque from './is-opaque';
import isTransparent from './is-transparent';

/**
 * Check if an element is translucent by definition of its 'opacity' CSS property.
 *
 * @see https://www.w3.org/TR/css3-color/#opacity
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isTranslucent(element, pseudo = Pseudo.DEFAULT) {
  return !isOpaque(element, pseudo) && !isTransparent(element, pseudo);
}
