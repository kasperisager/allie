import {find, split, trim, toLower} from 'bundstreg';
import {attr, tag, matches} from 'hoardom';
import ROLES from '../../data/aria/roles';
import ELEMENTS from '../../data/aria/elements';

const ROLE = Symbol('role');

/**
 * Get the semantic role of an element.
 *
 * @see https://www.w3.org/TR/html-aria/
 *
 * @param {Element} element
 * @param {Boolean} [implicit=true]
 * @return {String}
 */
export default function role(element, implicit = true) {
  return element.lazy(ROLE,
    () => {
      let role = trim(attr(element, 'role'));

      if (!role && implicit) {
        const feature = tag(element);

        implicit = find(ELEMENTS[feature], implicit => {
          const {include, exclude} = implicit;

          if (include && !matches(element, include)) {
            return false;
          }

          if (exclude && matches(element, exclude)) {
            return false;
          }

          return true;
        });

        if (implicit) {
          role = implicit.role;
        }
      }

      const roles = split(toLower(role), /\s+/);
      const first = find(roles, role => role in ROLES);

      return first ? first : null;
    }
  );
}
