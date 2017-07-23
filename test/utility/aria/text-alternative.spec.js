import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import textAlternative from '../../../lib/utility/aria/text-alternative';

describe('textAlternative', () => {
  it('returns the text alternative of an image with an alt', async () => {
    await test(
      `
      <img src="foo.png" alt="Lorem ipsum">
      `,
      img => assert(textAlternative(img) === 'Lorem ipsum')
    );
  });

  it('returns the text alternative of an area with an alt', async () => {
    await test(
      `
      <map>
        <area href="/foo" alt="Lorem ipsum">
      </map>
      `,
      map => assert(textAlternative(find(map, 'area')) === 'Lorem ipsum')
    );
  });

  it('returns the text alternative of an element with an aria-label', async () => {
    await test(
      `
      <p aria-label="Lorem ipsum">Dolor sit amet</p>
      `,
      p => assert(textAlternative(p) === 'Lorem ipsum')
    );
  });

  it('returns the text alternative of an element with an aria-labelledby', async () => {
    await test(
      `
      <div id="foo">Lorem</div>
      <div id="bar">ipsum</div>
      <button aria-labelledby="foo bar">Dolor sit amet</button>
      `,
      body => assert(textAlternative(find(body, 'button')) === 'Lorem ipsum')
    );
  });

  it('includes CSS pseudo elements in text alternatives', async () => {
    await test(
      `
      <style>
        button::before {
          content: "Lorem"
        }

        button::after {
          content: attr(ipsum)
        }
      </style>

      <button ipsum="ipsum">-</button>
      `,
      body => assert(textAlternative(find(body, 'button')) === 'Lorem-ipsum')
    );
  });
});
