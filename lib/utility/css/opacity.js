import {Pseudo, css} from 'hoardom';

const PRECISION = 1e2;

/**
 * Get the opacity of an element.
 *
 * NB: This function DOES NOT and SHOULD NOT account for alpha compositing. This
 * is not a bug but a design choice since the opacity function is used in other
 * functions that DO account for alpha compositing.
 *
 * @param {Element} element
 * @return {Numer}
 */
export default function opacity(element, pseudo = Pseudo.DEFAULT) {
  const opacity = parseFloat(css(element, 'opacity', pseudo));
  return Math.round(opacity * PRECISION) / PRECISION;
}
