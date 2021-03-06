import assert from 'power-assert';
import test from '../../helper/test';
import fontSize, {PX, PT} from '../../../lib/utility/css/font-size';

describe('fontSize', () => {
  it('returns the font size of an element in pixels', async () => {
    await test(
      `
      <p style="font-size: 12px">Lorem ipsum</p>
      `,
      p => assert(fontSize(p, PX) === 12)
    );

    await test(
      `
      <p style="font-size: 1.5em">Lorem ipsum</p>
      `,
      p => assert(fontSize(p, PX) === 24)
    );
  });

  it('returns the font size of an element in points', async () => {
    await test(
      `
      <p style="font-size: 12px">Lorem ipsum</p>
      `,
      p => assert(fontSize(p, PT) === 9)
    );

    await test(
      `
      <p style="font-size: 11pt">Lorem ipsum</p>
      `,
      p => assert(fontSize(p, PT) === 11)
    );
  });

  it('returns the font size of an element in points by default', async () => {
    await test(
      `
      <p style="font-size: 12px">Lorem ipsum</p>
      `,
      p => assert(fontSize(p) === 9)
    );
  });
});
