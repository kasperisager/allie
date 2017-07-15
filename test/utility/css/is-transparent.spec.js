import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import isTransparent from '../../../lib/utility/css/is-transparent';

describe('isTransparent', () => {
  it('should return true if an element is fully transparent', async () => {
    await test(
      `
      <p style="opacity: 0">Lorem ipsum</p>
      `,
      p => assert(isTransparent(p) === true)
    );
  });

  it('should return false if an element is not fully transparent', async () => {
    await test(
      `
      <p>Lorem ipsum</p>
      `,
      p => assert(isTransparent(p) === false)
    );

    await test(
      `
      <p style="opacity: 0.8">Lorem ipsum</p>
      `,
      p => assert(isTransparent(p) === false)
    );
  });

  it('should return true if a parent of an element is fully transparent', async () => {
    await test(
      `
      <div style="opacity: 0">
        <p>Lorem ipsum</p>
      </div>
      `,
      div => assert(isTransparent(find(div, 'p')) === true)
    );

    await test(
      `
      <div style="opacity: 0">
        <div>
          <p>Lorem ipsum</p>
        </div>
      </div>
      `,
      div => assert(isTransparent(find(div, 'p')) === true)
    );
  });

  it('should return false if a parent of an element is not fully transparent', async () => {
    await test(
      `
      <div style="opacity: 0.8">
        <p>Lorem ipsum</p>
      </div>
      `,
      div => assert(isTransparent(find(div, 'p')) === false)
    );

    await test(
      `
      <div style="opacity: 0.8">
        <div>
          <p>Lorem ipsum</p>
        </div>
      </div>
      `,
      div => assert(isTransparent(find(div, 'p')) === false)
    );
  });

  it('should return true if the composite opacity of an element is fully transparent', async () => {
    await test(
      `
      <div style="opacity: 0.1">
        <div style="opacity: 0.1">
          <p style="opacity: 0.1">Lorem ipsum</p>
        </div>
      </div>
      `,
      div => assert(isTransparent(find(div, 'p')) === true)
    );
  });
});
