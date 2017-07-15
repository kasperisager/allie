import {tag, prop, closest, matches} from 'hoardom'

const IS_ENABLED = Symbol('isEnabled');

/**
 * Check if an element is enabled.
 *
 * @see https://html.spec.whatwg.org/multipage/scripting.html#disabled-elements
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isEnabled(element) {
  return element.lazy(IS_ENABLED,
    () => {
      switch (tag(element)) {
        case 'button':
        case 'input':
        case 'select':
        case 'textarea': {
          if (prop(element, 'disabled')) {
            return false;
          }

          if (!closest(element, 'fieldset[disabled]')) {
            return true;
          }

          const legend = closest(element, 'legend');
          return legend && matches(legend, 'legend:first-of-type');
        }
        case 'option': {
          if (prop(element, 'disabled')) {
            return false;
          }

          const optgroup = closest(element, 'optgroup');
          return !(optgroup && prop(optgroup, 'disabled'));
        }
        case 'optgroup':
        case 'menuitem':
        case 'fieldset':
          return !prop(element, 'disabled');
        default:
          return true;
      }
    }
  );
}
