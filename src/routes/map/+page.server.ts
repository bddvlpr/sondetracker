import { getStations } from '$lib/server/api/stations';

import type { PageServerLoad } from './$types';

export const load = (async () => {
  const stations = getStations();

  return { stations };
}) satisfies PageServerLoad;
