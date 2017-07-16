import {includes} from 'bundstreg';
import ROLES from '../../data/aria/roles';
import role from './role';

/**
 * Check if an element is a landmark.
 *
 * @see https://www.w3.org/TR/wai-aria/roles#landmark_roles
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isLandmark(element) {
  const spec = ROLES[role(element)];

  if (!spec) {
    return false;
  }

  return includes(spec.inherits, 'landmark');
}
