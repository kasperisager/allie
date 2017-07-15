import {has, prop, find, closest, root} from 'hoardom';

/**
 * @see https://html.spec.whatwg.org/multipage/forms.html#category-label
 */
const LABELABLE = `
  button,
  input:not([type=hidden]),
  meter,
  output,
  progress,
  select,
  textarea
`;

/**
 * Check if an element has an associated label.
 *
 * @see https://html.spec.whatwg.org/multipage/forms.html#the-label-element
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function hasLabel(element) {
  const id = prop(element, 'id');

  if (id && has(root(element), `label[for="${id}"]`)) {
    return true;
  }

  const label = closest(element, 'label');

  return label !== null && find(label, LABELABLE) === element;
}
