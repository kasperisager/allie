import {Pseudo, Cache, tag, css, parent} from 'hoardom';
import {composite} from 'kuloer';
import color from '../color';
import opacity from './opacity';

const BACKGROUND_COLOR = Symbol('backgroundColor');

const WHITE = color('white');

/**
 * Get the composited background color of an element.
 *
 * @param {Element} element
 * @param {Pseudo} [pseudo]
 * @return {Color}
 */
export default function backgroundColor(element, pseudo = Pseudo.DEFAULT) {
  return element.lazy(BACKGROUND_COLOR,
    () => new Cache(new Map()),
    cache => cache.get(pseudo, () => {
      const background = color(css(element, 'background-color', pseudo));

      background.alpha *= opacity(element);

      // If the background color is completely opaque, there's no need to look
      // further.
      if (background.alpha === 1) {
        return background;
      }

      // If the element has no parent, i.e. is the root element, the background
      // color will be blended with white.
      if (parent(element) === null) {
        return composite([WHITE, background]);
      }

      // Otherwise, compute the background color of the parent element and
      // blend it with the background color of the element.
      return composite([backgroundColor(parent(element), pseudo), background]);
    })
  );
}
