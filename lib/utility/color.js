import Color, * as kuloer from 'kuloer';

const PRECISION = 1e2;

const COLORS = new Map();

const STRINGS = new Map();

/**
 * Convert a color string to a color object.
 *
 * @param {String} string
 * @return {Color}
 */
export default function color(string) {
  if (!STRINGS.has(string)) {
    const color = new Color(string);

    if (!COLORS.has(color.hex)) {
      COLORS.set(color.hex, color);
    }

    STRINGS.set(string, color.hex);
  }

  return COLORS.get(STRINGS.get(string));
}

/**
 * Compute the contrast between two colors.
 *
 * NB: Order does NOT matter!
 *
 * @param {Color} first
 * @param {Color} second
 * @return {Number}
 */
export function contrast(first, second) {
  const contrast = kuloer.contrast(first, second);
  return Math.round(contrast * PRECISION) / PRECISION;
}

/**
 * Compute the composite of a background and foreground color.
 *
 * NB: Order DOES matter!
 *
 * @param {Color} background
 * @param {Color} foreground
 * @return {Color}
 */
export function composite(background, foreground) {
  return composite([background, foreground]);
}
