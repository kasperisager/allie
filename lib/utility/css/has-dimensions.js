import {width, height} from 'hoardom';

// The threshold for when we consider an element to lack dimensions. This will
// ensure that we don't consider content that has been collapsed to a single
// pixel as having dimensions. This is typically the case with tracking pixels
// and content that is only supposed to be visible to assitive technology.
const THRESHOLD = 1;

/**
 * Check if an element has dimensions, i.e. a non-zero height and width.
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function hasDimensions(element) {
  return width(element) > THRESHOLD && height(element) > THRESHOLD;
}
