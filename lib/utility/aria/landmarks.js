import {map, filter, entries, includes, concat, join} from 'bundstreg';
import {findAll} from 'hoardom';
import ROLES from '../../data/aria/roles';
import ELEMENTS from '../../data/aria/elements';
import isLandmark from './is-landmark';

/**
 * Collect a list of landmark roles, i.e. roles inheriting from the abstract
 * landmark role, from the ARIA specification.
 *
 * @see https://www.w3.org/TR/wai-aria/roles#landmark_roles
 */
const LANDMARKS = map(
  filter(entries(ROLES), ([_, {inherits}]) =>
    includes(inherits, 'landmark')
  ),
  ([role]) => role
);

/**
 * Collect a list of elements with implicit landmark semantics from the ARIA
 * specification.
 *
 * @see https://www.w3.org/TR/html-aria/#docconformance
 */
const IMPLCITS = map(
  filter(entries(ELEMENTS), ([_, [{role}]]) =>
    includes(LANDMARKS, role)
  ),
  ([element]) => element
);

/**
 * A selector that will target at least all explicit and implicit landmarks,
 * including potential false positives.
 */
const SELECTOR = join(
  concat(IMPLCITS, map(LANDMARKS, landmark =>
    `[role*=${landmark}]`)
  ),
  ','
);

/**
 * Get all landmarks contained within an element.
 *
 * @param {Element} element
 * @return {Array<Element>}
 */
export default function landmarks(element) {
  return filter(findAll(element, SELECTOR), isLandmark);
}
