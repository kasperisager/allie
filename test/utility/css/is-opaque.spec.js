import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import isOpaque from '../../../lib/utility/css/is-opaque';

describe('isOpaque', () => {
  it('should return true if an element is fully opaque', async () => {
    await test(
      `
      <p>Lorem ipsum</p>
      `,
      p => assert(isOpaque(p) === true)
    );
  });

  it('should return false if an element is not fully opaque', async () => {
    await test(
      `
      <p style="opacity: 0.8">Lorem ipsum</p>
      `,
      p => assert(isOpaque(p) === false)
    );
  });

  it('should return false if a parent of an element is not fully opaque', async () => {
    await test(
      `
      <div style="opacity: 0.8">
        <p>Lorem ipsum</p>
      </div>
      `,
      div => assert(isOpaque(find(div, 'p')) === false)
    );

    await test(
      `
      <div style="opacity: 0.8">
        <div>
          <p>Lorem ipsum</p>
        </div>
      </div>
      `,
      div => assert(isOpaque(find(div, 'p')) === false)
    );
  });
});
