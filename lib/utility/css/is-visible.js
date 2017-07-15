import {Pseudo, css} from 'hoardom';

/**
 * Check if an element is visible by definition of its 'visible' CSS property.
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isVisible(element, pseudo = Pseudo.DEFAULT) {
  const visibility = css(element, 'visibility', pseudo);
  return visibility !== 'hidden' && visibility !== 'collapse';
}
