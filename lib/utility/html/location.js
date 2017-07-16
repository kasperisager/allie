import {prop} from 'hoardom';

/**
 * Get the location of the containing view of an element.
 *
 * @param {Element} element
 * @return {String}
 */
export default function location(element) {
  return prop(element, 'ownerDocument').defaultView.location;
}
