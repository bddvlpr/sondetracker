import type { Listener, Site, Sonde } from './api';

import { fetchListeners } from './api/listeners';
import { fetchSites } from './api/sites';
import { fetchSondes } from './api/sondes';
import { getLastEntry, type History } from './history';

let listeners = $state<Listener[]>([]);
let sondes = $state<{ [serial: string]: History<Sonde> }>({});
let sites = $state<{ [serial: string]: Site }>({});

export const refreshListeners = async () => {
  const fetchedListeners = await fetchListeners();
  listeners = Object.values(fetchedListeners).map((serial) => getLastEntry<Listener>(serial));
};

export const refreshSondes = async () => {
  const fetchedSondes = await fetchSondes();
  sondes = fetchedSondes;
};

export const refreshSonde = async (serial: string) => {
  const fetchedSonde = await fetchSondes(serial);
  console.log('refreshing sonde', serial);
  sondes[serial] = fetchedSonde[serial];
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
  if (sondes[serial]) {
    if (!sondes[serial][datetime]) {
      sondes[serial][datetime] = sonde;
    }
  } else {
    sondes[serial] = { [datetime]: sonde };
  }
};
