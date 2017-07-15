import assert from 'power-assert';
import test from '../../helper/test';
import hasText from '../../../lib/utility/html/has-text';

describe('hasText', () => {
  it('returns true when an element contains direct text', async () => {
    await test(
      `
      <p>This is some text</p>
      `,
      p => assert(hasText(p) === true)
    );
  });

  it('returns true when an element contains inline text', async () => {
    await test(
      `
      <p><span>This is some text</span></p>
      `,
      p => assert(hasText(p) === true)
    );
  });

  it('returns false when an element contains no text', async () => {
    await test(
      `
      <p></p>
      `,
      p => assert(hasText(p) === false)
    );

    await test(
      `
      <p><span></span></p>
      `,
      p => assert(hasText(p) === false)
    );
  });

  it('returns false when text is contained in a nested block element', async () => {
    await test(
      `
      <div>
        <p>This is some text</p>
      </div>
      `,
      div => assert(hasText(div) === false)
    );
  });
});
