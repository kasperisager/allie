import assert from 'power-assert';
import {find} from 'hoardom';
import test from '../../helper/test';
import isEnabled from '../../../lib/utility/html/is-enabled';

describe('isEnabled', () => {
  it('returns true if a form control is enabled', async () => {
    await test(
      `
      <button>Lorem ipsum</button>
      `,
      button => assert(isEnabled(button) === true)
    );

    await test(
      `
      <fieldset>
        <button>Lorem ipsum</button>
      </fieldset>
      `,
      fieldset => {
        assert(isEnabled(fieldset) === true);
        assert(isEnabled(find(fieldset, 'button')) === true);
      }
    );

    await test(
      `
      <fieldset>
        <legend>
          <button>Lorem ipsum</button>
        </legend>
      </fieldset>
      `,
      fieldset => assert(isEnabled(find(fieldset, 'button')) === true)
    );

    await test(
      `
      <fieldset disabled>
        <legend>
          <button>Lorem ipsum</button>
        </legend>
      </fieldset>
      `,
      fieldset => assert(isEnabled(find(fieldset, 'button')) === true)
    );

    await test(
      `
      <select>
        <option>Lorem ipsum</option>
      </select>
      `,
      select => assert(isEnabled(find(select, 'option')) === true)
    );

    await test(
      `
      <select>
        <optgroup>
          <option>Lorem ipsum</option>
        </optgroup>
      </select>
      `,
      select => assert(isEnabled(find(select, 'option')) === true)
    );
  });

  it('returns false if a form control is disabled', async () => {
    await test(
      `
      <button disabled>Lorem ipsum</button>
      `,
      button => assert(isEnabled(button) === false)
    );

    await test(
      `
      <fieldset disabled>
        <button>Lorem ipsum</button>
      </fieldset>
      `,
      fieldset => {
        assert(isEnabled(fieldset) === false);
        assert(isEnabled(find(fieldset, 'button')) === false);
      }
    );

    await test(
      `
      <fieldset disabled>
        <legend>
          Lorem ipsum
        </legend>

        <button>Lorem ipsum</button>
      </fieldset>
      `,
      fieldset => assert(isEnabled(find(fieldset, 'button')) === false)
    );

    await test(
      `
      <fieldset disabled>
        <legend>
          Lorem ipsum
        </legend>

        <legend>
          <button>Lorem ipsum</button>
        </legend>
      </fieldset>
      `,
      fieldset => assert(isEnabled(find(fieldset, 'button')) === false)
    );

    await test(
      `
      <select>
        <option disabled>Lorem ipsum</option>
      </select>
      `,
      select => assert(isEnabled(find(select, 'option')) === false)
    );

    await test(
      `
      <select>
        <optgroup disabled>
          <option>Lorem ipsum</option>
        </optgroup>
      </select>
      `,
      select => assert(isEnabled(find(select, 'option')) === false)
    );
  });

  it('returns true if passed a non-form control', async () => {
    await test(
      `
      <p>Lorem ipsum</p>
      `,
      p => assert(isEnabled(p) === true)
    );

    await test(
      `
      <p disabled>Lorem ipsum</p>
      `,
      p => assert(isEnabled(p) === true)
    );
  });
});
