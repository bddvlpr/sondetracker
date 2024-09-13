import createClient from 'openapi-fetch';

import type { components, paths } from './specification';

export default createClient<paths>({
  baseUrl: 'https://api.v2.sondehub.org',
  headers: {
    'User-Agent': 'Sondetracker'
  }
});

export type Listener = components['schemas']['listener'];
export type Site = components['schemas']['site'];
export type Sonde = components['schemas']['telemetry_format'];
