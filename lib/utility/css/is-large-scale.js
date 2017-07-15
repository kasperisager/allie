import isBold from './is-bold';
import fontSize, {PT} from './font-size';

/**
 * Check if an element uses large scale text.
 *
 * @see https://www.w3.org/TR/WCAG20/#larger-scaledef
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isLargeScale(element) {
  const size = fontSize(element, PT);

  return size >= 18 || (size >= 14 && isBold(element));
}
