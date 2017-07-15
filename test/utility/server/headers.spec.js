import assert from 'power-assert';
import headers from '../../../lib/utility/server/headers';

describe('headers', () => {
  it('returns the HTTP headers for the current document', async () => {
    const h = await headers();

    assert(h.get('Lorem-Ipsum') === 'dolor-sit-amet');
  });
});
