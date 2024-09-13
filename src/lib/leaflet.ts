import type { LatLngExpression, MapOptions, TileLayerOptions } from 'leaflet';

export const DEFAULT_MAP_OPTIONS: MapOptions = {
  preferCanvas: true,
  center: [50.85, 4.348],
  zoom: 3
};

export const DEFAULT_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const DEFAULT_LAYER_OPTIONS: TileLayerOptions = {};

export const parseLatLng = (position: number[]) =>
  (position.length >= 3
    ? [position[0], position[1]]
    : [position[1], position[0]]) satisfies LatLngExpression;
