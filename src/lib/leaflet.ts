import type { LatLngExpression, TileLayerOptions } from 'leaflet';

export const DEFAULT_LAYER = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
export const DEFAULT_LAYER_OPTIONS: TileLayerOptions = {};

export const getLatLng = (position: number[]) =>
  [position[1], position[0]] satisfies LatLngExpression;
