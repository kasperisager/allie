import {prop} from 'hoardom';
import isDisplayed from '../css/is-displayed';
import isVisible from '../css/is-visible';
import isEnabled from './is-enabled';

const IS_TABBABLE = Symbol('isTabbable');

/**
 * Check if an element is tabbable, i.e. reachable through sequential keyboard
 * navigation.
 *
 * @see https://html.spec.whatwg.org/multipage/interaction.html#suitable-sequentially-focusable-area
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isTabbable(element) {
  return element.lazy(IS_TABBABLE,
    () => (
      prop(element, 'tabIndex') >= 0 &&
      isVisible(element) &&
      isDisplayed(element) &&
      isEnabled(element)
    )
  );
}
