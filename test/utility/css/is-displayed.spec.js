import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import isDisplayed from '../../../lib/utility/css/is-displayed';

describe('isDisplayed', () => {
  it('returns true when an element is not display: none', async () => {
    await test(
      `
      <p>Lorem ipsum</p>
      `,
      p => assert(isDisplayed(p) === true)
    );
  });

  it('returns false when an element is display: none', async () => {
    await test(
      `
      <p style="display: none">Lorem ipsum</p>
      `,
      p => assert(isDisplayed(p) === false)
    );
  });

  it('returns false when the parent of an element is display: none', async () => {
    await test(
      `
      <div style="display: none">
        <p>Lorem ipsum</p>
      </div>
      `,
      div => assert(isDisplayed(find(div, 'p')) === false)
    );

    await test(
      `
      <div style="display: none">
        <div>
          <p>Lorem ipsum</p>
        </div>
      </div>
      `,
      div => assert(isDisplayed(find(div, 'p')) === false)
    );
  });
});
