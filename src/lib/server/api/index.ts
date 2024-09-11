import createClient from 'openapi-fetch';

import type { paths } from './specification';

export default createClient<paths>({
  baseUrl: 'https://api.v2.sondehub.org',
  headers: {
    'User-Agent': 'Sondetracker'
  }
});
