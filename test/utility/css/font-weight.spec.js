import assert from 'power-assert';
import test from '../../helper/test';
import fontWeight from '../../../lib/utility/css/font-weight';

describe('fontWeight', () => {
  it('should return the font weight of an element as an integer', async () => {
    await test(
      `
      <p style="font-weight: normal">Lorem ipsum</p>
      `,
      p => assert(fontWeight(p) === 400)
    );

    await test(
      `
      <p style="font-weight: bold">Lorem ipsum</p>
      `,
      p => assert(fontWeight(p) === 700)
    );

    await test(
      `
      <p style="font-weight: 500">Lorem ipsum</p>
      `,
      p => assert(fontWeight(p) === 500)
    );
  });
});
