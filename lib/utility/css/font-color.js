import {Pseudo, Cache, css} from 'hoardom';
import {composite} from 'kuloer';
import color from '../color';
import backgroundColor from './background-color';
import opacity from './opacity';

const FONT_COLOR = Symbol('fontColor');

/**
 * Get the composited font color of an element.
 *
 * @param {Element} element
 * @param {Pseudo} [pseudo]
 * @return {Color}
 */
export default function fontColor(element, pseudo = Pseudo.DEFAULT) {
  return element.lazy(FONT_COLOR,
    () => new Cache(new Map()),
    cache => cache.get(pseudo, () => {
      const font = color(css(element, 'color', pseudo));

      font.alpha *= opacity(element);

      // If the font color is completely opaque, there's no need to look
      // further.
      if (font.alpha === 1) {
        return font;
      }

      // Otherwise, compute the background color of the element and blend it
      // with the font color of the element.
      return composite([backgroundColor(element, pseudo), font]);
    })
  );
}
