import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import hasLabel from '../../../lib/utility/html/has-label';

describe('hasLabel', () => {
  it('should return true if an element has an explicitly associated label', async () => {
    await test(
      `
      <label for="input">Lorem ipsum</label>
      <input id="input" type="text">
      `,
      body => assert(hasLabel(find(body, 'input')) === true)
    );
  });

  it('should return true if an element has an implicitly associated label', async () => {
    await test(
      `
      <label>
        Lorem ipsum
        <input type="text">
      </label>
      `,
      body => assert(hasLabel(find(body, 'input')) === true)
    );

    await test(
      `
      <label>
        Lorem ipsum
        <input type="text">
        <button>Lorem ipsum</button>
      </label>
      `,
      body => assert(hasLabel(find(body, 'input')) === true)
    );
  });

  it('should return false if an element has no associated label', async () => {
    await test(
      `
      <input id="input" type="text">
      `,
      input => assert(hasLabel(input) === false)
    );

    await test(
      `
      <label>Lorem ipsum</label>
      <input type="text">
      `,
      body => assert(hasLabel(find(body, 'input')) === false)
    );

    await test(
      `
      <label>
        Lorem ipsum
        <button>Lorem ipsum</button>
        <input type="text">
      </label>
      `,
      body => assert(hasLabel(find(body, 'input')) === false)
    );
  });
});
