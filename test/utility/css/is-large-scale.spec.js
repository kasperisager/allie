import assert from 'power-assert';
import test from '../../helper/test';
import isLargeScale from '../../../lib/utility/css/is-large-scale';

describe('isLargeScale', () => {
  it('returns true if an element uses large scale text', async () => {
    await test(
      `
      <p style="font-size: 18pt">Lorem ipsum</p>
      `,
      p => assert(isLargeScale(p) === true)
    );

    await test(
      `
      <p style="font-size: 20pt">Lorem ipsum</p>
      `,
      p => assert(isLargeScale(p) === true)
    );

    await test(
      `
      <p style="font-size: 14pt; font-weight: bold">Lorem ipsum</p>
      `,
      p => assert(isLargeScale(p) === true)
    );

    await test(
      `
      <p style="font-size: 14pt; font-weight: 900">Lorem ipsum</p>
      `,
      p => assert(isLargeScale(p) === true)
    );

    await test(
      `
      <p style="font-size: 20pt; font-weight: bold">Lorem ipsum</p>
      `,
      p => assert(isLargeScale(p) === true)
    );
  });

  it('returns false if an element does not use large scale text', async () => {
    await test(
      `
      <p style="font-size: 16pt">Lorem ipsum</p>
      `,
      p => assert(isLargeScale(p) === false)
    );

    await test(
      `
      <p style="font-size: 14pt">Lorem ipsum</p>
      `,
      p => assert(isLargeScale(p) === false)
    );

    await test(
      `
      <p style="font-size: 13pt; font-weight: bold">Lorem ipsum</p>
      `,
      p => assert(isLargeScale(p) === false)
    );
  });
});
