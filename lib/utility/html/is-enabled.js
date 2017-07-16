import {tag, prop, closest, matches} from 'hoardom'

const IS_ENABLED = Symbol('isEnabled');

/**
 * Check if an element is enabled.
 *
 * @see https://html.spec.whatwg.org/multipage/semantics-other.html#disabled-elements
 * @see https://html.spec.whatwg.org/multipage/form-control-infrastructure.html#concept-fe-disabled
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isEnabled(element) {
  switch (tag(element)) {
    case 'button':
    case 'input':
    case 'select':
    case 'textarea': {
      if (prop(element, 'disabled')) {
        return false;
      }

      if (!matches(element, 'fieldset[disabled] *')) {
        return true;
      }

      return matches(element, 'fieldset > legend:first-of-type *');
    }
    case 'option': {
      if (prop(element, 'disabled')) {
        return false;
      }

      return !matches(element, 'optgroup[disabled] *');
    }
    case 'optgroup':
    case 'menuitem':
    case 'fieldset':
      return !prop(element, 'disabled');
    default:
      return true;
  }
}
