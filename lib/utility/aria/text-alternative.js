import {split, map, trim, join} from 'bundstreg';
import {tag, attr, text, find, root} from 'hoardom';
import ROLES from '../../data/aria/roles';
import children from '../html/children';
import isText from '../html/is-text';
import content, {BEFORE, AFTER} from '../css/content';
import isPerceivable from './is-perceivable';
import role from './role';

const EMPTY = '';
const SPACE = ' ';

/**
 * Get the computed accessible text alternative of an element.
 *
 * @see https://www.w3.org/TR/accname-aam-1.1/
 *
 * @param {Element} element
 * @param {Object} options
 * @return {String}
 */
export default function textAlternative(element, options = {}) {
  const {recursive = false, forced = false} = options;

  if (isText(element)) {
    return trim(text(element));
  }

  if (!forced && !isPerceivable(element)) {
    return EMPTY;
  }

  const labelledby = trim(attr(element, 'aria-labelledby'));

  if (labelledby && !recursive) {
    const labels = map(split(labelledby, /\s+/), id =>
      textAlternative(
        find(root(element), `#${id}`),
        {
          recursive: true,
          forced: true
        }
      )
    );

    return join(labels, SPACE);
  }

  const label = trim(attr(element, 'aria-label'));

  if (label) {
    return label;
  }

  const semantics = role(element);

  if (!semantics || (semantics !== 'presentation' && semantics !== 'none')) {
    switch (tag(element)) {
      case 'img':
      case 'area': {
        const alt = trim(attr(element, 'alt'));

        if (alt) {
          return alt;
        }
      }
    }
  }

  const spec = ROLES[semantics];

  if ((spec && spec.name === 'contents') || forced) {
    const texts = map(
      children(element, {elements: true, texts: true}),
      child => textAlternative(child, {
        recursive: true
      })
    );

    const text = join(texts, SPACE);
    const before = content(element, BEFORE);
    const after = content(element, AFTER);

    return `${before}${text}${after}`;
  }

  return EMPTY;
}
