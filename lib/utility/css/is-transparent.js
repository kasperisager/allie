import {some} from 'bundstreg';
import {Pseudo, parents} from 'hoardom';
import opacity from './opacity';

// The threshold for when we consider an element to be transparent. We rely on
// an explicit treshold as composited opacities are not likely to ever reach 0,
// even though they might be practically transparent when they reach the set
// threshold.
const THRESHOLD = 1e-2;

/**
 * Check if an element is transparent by definition of its 'opacity' CSS property.
 *
 * @see https://www.w3.org/TR/css3-color/#opacity
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isTransparent(element, pseudo = Pseudo.DEFAULT) {
  let composite = opacity(element, pseudo);

  if (composite < THRESHOLD) {
    return true;
  }

  return some(parents(element), parent => {
    // Since opacity is subject to alpha compositing we multiply the collected
    // opacities on our way up through the parent elements.
    composite *= opacity(parent, pseudo);

    // If at any point we reach a composited opacity lower than the threshold,
    // we know that the element is transparent.
    return composite < THRESHOLD;
  });
}
