import assert from 'power-assert';
import {tag} from 'hoardom';
import test from '../../helper/test';
import landmarks from '../../../lib/utility/aria/landmarks';

describe('landmarks', () => {
  it('returns the landmarks contained within an element', async () => {
    await test(
      `
      <header>Header</header>
      <main>
        <div role="navigation">Navigation</div>
        <article>
          <p>Lorem ipsum</p>
          <footer>Footer</footer>
        </article>
      </main>
      `,
      body => {
        const [header, main, navigation, ...rest] = landmarks(body);

        assert(rest.length === 0);

        assert(tag(header) === 'header');
        assert(tag(main) === 'main');
        assert(tag(navigation) === 'div');
      }
    );
  });
});
