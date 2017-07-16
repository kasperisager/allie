import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import isInternalLink from '../../../lib/utility/html/is-internal-link';

describe('isInternalLink', () => {
  it('returns true if a link references an internal fragment', async () => {
    await test(
      `
      <section>
        <div id="fragment">Dolor sit amet</div>
      </section>
      `,
      section => assert(isInternalLink(section, '#fragment') === true)
    );

    await test(
      `
      <section>
        <a name="fragment">Dolor sit amet</a>
      </section>
      `,
      section => assert(isInternalLink(section, '#fragment') === true)
    );
  });

  it('returns false if a link does not reference an internal fragment', async () => {
    await test(
      `
      <section>
        <div>Dolor sit amet</div>
      </section>
      `,
      section => assert(isInternalLink(section, '#fragment') === false)
    );

    await test(
      `
      <section>
        <a>Dolor sit amet</a>
      </section>
      `,
      section => assert(isInternalLink(section, '#fragment') === false)
    );

    await test(
      `
      <section>
        <div id="fragment">Dolor sit amet</div>
      </section>
      `,
      section => {
        assert(isInternalLink(section, 'foo#fragment') === false);
        assert(isInternalLink(section, 'http://foo.bar/#fragment') === false);
      }
    );
  });

  it('accounts for an explicitly defined <base> element', async () => {
    await test(
      `
      <html>
        <head>
          <base href="http://foo.bar/">
        </head>
        <body>
          <div id="fragment">Dolor sit amet</div>
        </body>
      </html>
      `,
      html => {
        assert(isInternalLink(html, '#fragment') === false);
        assert(isInternalLink(html, location.href + '#fragment') === true);
      }
    );
  });
});
