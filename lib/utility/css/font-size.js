import {css} from 'hoardom';

const PRECISION = 1e2;

export const PX = Symbol('px');
export const PT = Symbol('pt');

/**
 * Get the font size of an element.
 *
 * @see https://www.w3.org/TR/css-values-3/#absolute-lengths
 *
 * @param {Element} element
 * @param {Symbol} [unit=PT]
 * @return {Number}
 */
export default function fontSize(element, unit = PT) {
  let size = parseFloat(css(element, 'font-size'));

  switch (unit) {
    case PT:
      size *= 0.75;
      break;
    default:
  }

  return Math.round(size * PRECISION) / PRECISION;
}
