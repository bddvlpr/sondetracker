import type { MapOptions, TileLayerOptions } from 'leaflet';

export const DEFAULT_MAP_OPTIONS: MapOptions = {
  center: [1.250111, 103.830933],
  zoom: 13
};

export const DEFAULT_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const DEFAULT_LAYER_OPTIONS: TileLayerOptions = {};
