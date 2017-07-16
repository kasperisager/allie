import assert from 'power-assert';
import {data} from 'hoardom';
import test from '../../helper/test';
import tabSequence from '../../../lib/utility/html/tab-sequence';

function assertSequence(sequence) {
  for (let i = 0, n = sequence.length; i < n; i++) {
    const element = sequence[i];
    const index = String(i);

    assert(data(element, 'index') === index);
  }
}

describe('tabSequence', () => {
  it('returns the tab sequence of child elements within a parent element', async () => {
    await test(
      `
      <section>
        <div tabindex="0" data-index="0">
          <input type="text" data-index="1">
        </div>
        <button data-index="2">Lorem ipsum</button>
      </section>
      `,
      section => assertSequence(tabSequence(section))
    );

    await test(
      `
      <section>
        <div tabindex="0" data-index="1">
          <input type="text" data-index="2">
        </div>
        <button tabindex="1" data-index="0">Lorem ipsum</button>
      </section>
      `,
      section => assertSequence(tabSequence(section))
    );

    await test(
      `
      <section>
        <div tabindex="0" data-index="0">
          <input type="text" data-index="1">
        </div>
        <button tabindex="1" disabled>Lorem ipsum</button>
      </section>
      `,
      section => assertSequence(tabSequence(section))
    );
  });
});
