import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import isTabbable from '../../../lib/utility/html/is-tabbable';

describe('isTabbable', () => {
  it('returns true when an element is reachable by sequential keyboard navigation', async () => {
    await test(
      `
      <div tabindex="0">Lorem ipsum</div>
      `,
      div => assert(isTabbable(div) === true)
    );

    await test(
      `
      <div tabindex="1">Lorem ipsum</div>
      `,
      div => assert(isTabbable(div) === true)
    );

    await test(
      `
      <button>Lorem ipsum</button>
      `,
      button => assert(isTabbable(button) === true)
    );
  });

  it('returns false when an element is unreachable by sequential keyboard navigation', async () => {
    await test(
      `
      <div tabindex="-1">Lorem ipsum</div>
      `,
      div => assert(isTabbable(div) === false)
    );

    await test(
      `
      <div tabindex="0" style="display: none">Lorem ipsum</div>
      `,
      div => assert(isTabbable(div) === false)
    );

    await test(
      `
      <div tabindex="0" style="visibility: hidden">Lorem ipsum</div>
      `,
      div => assert(isTabbable(div) === false)
    );

    await test(
      `
      <button disabled>Lorem ipsum</button>
      `,
      button => assert(isTabbable(button) === false)
    );
  });
});
