import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import isFocusable from '../../../lib/utility/html/is-focusable';

describe('isFocusable', () => {
  it('returns true when an element can receive focus', async () => {
    await test(
      `
      <div tabindex="-1">Lorem ipsum</div>
      `,
      div => assert(isFocusable(div) === true)
    );

    await test(
      `
      <div tabindex="0">Lorem ipsum</div>
      `,
      div => assert(isFocusable(div) === true)
    );

    await test(
      `
      <button>Lorem ipsum</button>
      `,
      button => assert(isFocusable(button) === true)
    );
  });

  it('returns false when an element cannot receive focus', async () => {
    await test(
      `
      <div>Lorem ipsum</div>
      `,
      div => assert(isFocusable(div) === false)
    );

    await test(
      `
      <button disabled>Lorem ipsum</button>
      `,
      button => assert(isFocusable(button) === false)
    );
  });
});
