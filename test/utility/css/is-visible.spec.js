import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import isVisible from '../../../lib/utility/css/is-visible';

describe('isVisible', () => {
  it('returns true if an element is visible', async () => {
    await test(
      `
      <p>Lorem ipsum</p>
      `,
      p => assert(isVisible(p) === true)
    );

    await test(
      `
      <p style="visibility: visible">Lorem ipsum</p>
      `,
      p => assert(isVisible(p) === true)
    );
  });

  it('returns false if an element is invisible', async () => {
    await test(
      `
      <p style="visibility: hidden">Lorem ipsum</p>
      `,
      p => assert(isVisible(p) === false)
    );

    await test(
      `
      <p style="visibility: collapse">Lorem ipsum</p>
      `,
      p => assert(isVisible(p) === false)
    );
  });

  it('returns true if the closest parent with a visibility set is visible', async () => {
    await test(
      `
      <div style="visibility: visible">
        <p>Lorem ipsum</p>
      </div>
      `,
      div => assert(isVisible(find(div, 'p')) === true)
    );

    await test(
      `
      <div style="visibility: hidden">
        <div style="visibility: visible">
          <p>Lorem ipsum</p>
        </div>
      </div>
      `,
      div => assert(isVisible(find(div, 'p')) === true)
    );

    await test(
      `
      <div style="visibility: collapse">
        <div style="visibility: visible">
          <p>Lorem ipsum</p>
        </div>
      </div>
      `,
      div => assert(isVisible(find(div, 'p')) === true)
    );
  });

  it('returns false if the closest parent with a visibility set is invisible', async () => {
    await test(
      `
      <div style="visibility: hidden">
        <p>Lorem ipsum</p>
      </div>
      `,
      div => assert(isVisible(find(div, 'p')) === false)
    );

    await test(
      `
      <div style="visibility: collapse">
        <p>Lorem ipsum</p>
      </div>
      `,
      div => assert(isVisible(find(div, 'p')) === false)
    );

    await test(
      `
      <div style="visibility: visible">
        <div style="visibility: hidden">
          <p>Lorem ipsum</p>
        </div>
      </div>
      `,
      div => assert(isVisible(find(div, 'p')) === false)
    );

    await test(
      `
      <div style="visibility: visible">
        <div style="visibility: collapse">
          <p>Lorem ipsum</p>
        </div>
      </div>
      `,
      div => assert(isVisible(find(div, 'p')) === false)
    );
  });
});
