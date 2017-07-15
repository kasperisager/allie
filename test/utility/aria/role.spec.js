import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import role from '../../../lib/utility/aria/role';

describe('role', () => {
  it('returns the role explicitly associated with an element', async () => {
    await test(
      `
      <div role="list">Lorem ipsum</div>
      `,
      div => assert(role(div) === 'list')
    );
  });

  it('returns the role implicitly associated with an element', async () => {
    await test(
      `
      <header>Lorem ipsum</header>
      `,
      header => assert(role(header) === 'banner')
    );

    await test(
      `
      <a href="#">Lorem ipsum</a>
      `,
      a => assert(role(a) === 'link')
    );
  });

  it('returns null if no role is associated with an element', async () => {
    await test(
      `
      <div>Lorem ipsum</div>
      `,
      div => assert(role(div) === null)
    );
    await test(
      `
      <article>
        <header>Lorem ipsum</header>
      </article>
      `,
      article => assert(role(find(article, 'header')) === null)
    );

    await test(
      `
      <a>Lorem ipsum</a>
      `,
      a => assert(role(a) === null)
    );
  });
});
