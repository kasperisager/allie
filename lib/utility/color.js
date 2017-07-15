import Color from 'kuloer';

export const CACHE = new Map();

/**
 * Convert a color string to a color object.
 *
 * @param {String} string
 * @return {COlor}
 */
export default function color(string) {
  if (!CACHE.has(string)) {
    CACHE.set(string, new Color(string));
  }

  return CACHE.get(string);
}
