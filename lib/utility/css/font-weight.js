import {css} from 'hoardom';

/**
 * Get the font weight of an element.
 *
 * @param {Element} element
 * @return {Number}
 */
export default function fontWeight(element) {
  const weight = css(element, 'font-weight');

  switch (weight) {
    case 'normal':
      return 400;
    case 'bold':
      return 700;
    default:
      return parseInt(weight, 10);
  }
}
