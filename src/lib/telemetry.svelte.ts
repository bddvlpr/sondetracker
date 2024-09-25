import type { Listener, Site, Sonde, SondeTelemetry } from './api';

import { fetchListeners } from './api/listeners';
import { fetchSites } from './api/sites';
import { fetchSondes } from './api/sondes';
import { getLastEntry, type History } from './history';

let listeners = $state<Listener[]>([]);
let sondes = $state<{
  [serial: string]: History<SondeTelemetry>;
}>({});
let sites = $state<{ [serial: string]: Site }>({});

export const refreshListeners = async () => {
  const fetchedListeners = await fetchListeners();
  listeners = Object.values(fetchedListeners).map((serial) => getLastEntry<Listener>(serial));
};

export const refreshSondes = async () => {
  const fetchedSondes = await fetchSondes();
  Object.values(fetchedSondes).forEach((telemetry) => {
    Object.values(telemetry).forEach(updateSonde);
  });
};

export const refreshSites = async () => {
  const fetchedSites = await fetchSites();
  sites = fetchedSites;
};

export const getListeners = () => listeners;
export const getSondes = () => sondes;
export const getSites = () => sites;

export const updateListener = (listener: Listener) => {
  const index = listeners.findIndex((l) => l.uploader_callsign === listener.uploader_callsign);
  if (index >= 0) {
    listeners[index] = listener;
  } else {
    listeners.push(listener);
  }
};

export const updateSonde = (sonde: Sonde) => {
  const { serial, datetime } = sonde;
  const stamp = new Date(datetime).toISOString();
  if (sondes[serial]) {
    const { uploader_callsign, frequency, snr } = sonde;
    if (!sondes[serial][stamp]) {
      sondes[serial][stamp] = {
        ...sonde,
        uploaders: [
          {
            uploader_callsign,
            frequency,
            snr
          }
        ]
      };
    } else {
      sondes[serial][stamp].uploaders?.push({
        uploader_callsign,
        frequency,
        snr
      });
    }
  } else {
    sondes[serial] = { [stamp]: sonde };
  }
};

refreshListeners();
refreshSondes();
refreshSites();
