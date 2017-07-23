import {map, filter} from 'bundstreg';
import {prop} from 'hoardom';

/**
 * Get the children of an element.
 *
 * @param {Element} element
 * @param {Object} options
 * @return {Array<Element>}
 */
export default function children(element, options = {}) {
  const {elements = true, texts = true} = options;

  const children = filter(prop(element, 'childNodes'), child => {
    switch (child.nodeType) {
      case Node.TEXT_NODE:
        return texts;
      case Node.ELEMENT_NODE:
        return elements;
      default:
        return false;
    }
  });

  return map(children, child => element.get(child));
}
