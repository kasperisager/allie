import {flatten, slice} from 'bundstreg';
import {prop} from 'hoardom';
import Deque from 'double-ended-queue';
import isTabbable from './is-tabbable';

const TAB_SEQUENCE = Symbol('tabSequence');

/**
 * Compute the tab sequence of children within an element.
 *
 * @see https://html.spec.whatwg.org/multipage/interaction.html#sequential-focus-navigation
 *
 * @param {Element} element
 * @return {Array<Element>}
 */
export default function tabSequence(element) {
  return element.lazy(TAB_SEQUENCE,
    () => {
      const indices = [];

      for (const child of element) {
        if (!isTabbable(child)) {
          continue;
        }

        const index = prop(child, 'tabIndex');

        if (indices[index] === undefined) {
          indices[index] = new Deque([child]);
        } else {
          indices[index].push(child);
        }
      }

      // Elements with positive, non-zero tab indices come before elements with
      // zero tab indices so the latter are moved to the end of the array.
      [indices[0], indices[indices.length]] = [new Deque(), indices[0]];

      return flatten(indices);
    },
    slice
  );
}
