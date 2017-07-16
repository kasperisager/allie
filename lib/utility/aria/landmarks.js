import {filter} from 'bundstreg';
import {findAll} from 'hoardom';
import isLandmark from './is-landmark';

/**
 * A selector that will target at least all explicit and implicit landmarks,
 * including potential false positives.
 *
 * @see https://www.w3.org/TR/wai-aria/roles#landmark_roles
 * @see https://www.w3.org/TR/html-aria/#docconformance
 */
const SELECTOR = `
  article,
  aside,
  footer,
  form,
  header,
  main,
  nav,
  section,
  [role*=application],
  [role*=banner],
  [role*=complementary],
  [role*=contentinfo],
  [role*=form],
  [role*=main],
  [role*=navigation],
  [role*=search]
`;

/**
 * Get all landmarks contained within an element.
 *
 * @param {Element} element
 * @return {Array<Element>}
 */
export default function landmarks(element) {
  return filter(findAll(element, SELECTOR), isLandmark);
}
