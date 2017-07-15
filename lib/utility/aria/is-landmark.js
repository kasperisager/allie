import role from './role';

/**
 * @see https://www.w3.org/TR/wai-aria/roles#landmark_roles
 */
const LANDMARKS = {
  application: true,
  banner: true,
  complementary: true,
  contentinfo: true,
  form: true,
  main: true,
  navigation: true,
  search: true
};

/**
 * Check if an element is a landmark.
 *
 * @see https://www.w3.org/TR/wai-aria/terms#def_landmark
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isLandmark(element) {
  return role(element) in LANDMARKS;
}
