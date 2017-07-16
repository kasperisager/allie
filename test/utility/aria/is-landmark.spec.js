import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import isLandmark from '../../../lib/utility/aria/is-landmark';

describe('isLandmark', () => {
  it('returns true if an element is an explicit landmark', async () => {
    await test(
      `
      <div role="banner">Lorem ipsum</div>
      `,
      div => assert(isLandmark(div) === true)
    );
  });

  it('returns true if an element is an implicit landmark', async () => {
    await test(
      `
      <header>Lorem ipsum</header>
      `,
      header => assert(isLandmark(header) === true)
    );
  });

  it('returns false if an element is not a landmark', async () => {
    await test(
      `
      <div>Lorem ipsum</div>
      `,
      div => assert(isLandmark(div) === false)
    );

    await test(
      `
      <header role="presentation">Lorem ipsum</header>
      `,
      header => assert(isLandmark(header) === false)
    );
  });
});
