import fontWeight from './font-weight';

/**
 * Check if an element uses bold text.
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isBold(element) {
  return fontWeight(element) >= 700;
}
