import type { Listener, Site } from './api';

import { fetchListeners } from './api/listeners';
import { fetchSites } from './api/sites';

let listeners = $state<Listener[]>([]);
let sites = $state<{ [serial: string]: Site }>({});

export const refreshListeners = async () => {
  const fetchedListeners = await fetchListeners();
  listeners = Object.values(fetchedListeners).map((serial) => {
    const keys = Object.keys(serial);
    return serial[keys[keys.length - 1]];
  });
};

export const refreshSites = async () => {
  const fetchedSites = await fetchSites();
  sites = fetchedSites;
};

export const getListeners = () => listeners;
export const getSites = () => sites;

export const updateListener = (listener: Listener) => {
  const index = listeners.findIndex((l) => l.uploader_callsign === listener.uploader_callsign);
  if (index >= 0) {
    listeners[index] = listener;
  } else {
    listeners.push(listener);
  }
};
