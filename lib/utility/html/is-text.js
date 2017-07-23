import {prop} from 'hoardom';

/**
 * Check if an element is a text node.
 *
 * @see https://dom.spec.whatwg.org/#dom-node-text_node
 *
 * @param {Element} element
 * @return {Boolean}
 */
export default function isText(element) {
  return prop(element, 'nodeType') === Node.TEXT_NODE;
}
