<script lang="ts">
  import type { Snippet } from 'svelte';

  import { DEFAULT_LAYER, DEFAULT_LAYER_OPTIONS } from '$lib/leaflet';
  import L, { type LatLngExpression } from 'leaflet';
  import 'leaflet.locatecontrol';
  import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
  import 'leaflet/dist/leaflet.css';
  import { LeafletMap, TileLayer } from 'svelte-leafletjs';

  let map: LeafletMap;
  let geocontrolMounted = false;

  const {
    geolocate = false,
    zoom = 3,
    zoomControl = true,
    center = [50.85045, 4.34878],
    children
  }: {
    geolocate?: boolean;
    zoom?: number;
    zoomControl?: boolean;
    center?: LatLngExpression;
    children?: Snippet;
  } = $props();

  $effect(() => {
    if (geolocate && !geocontrolMounted) {
      L.control.locate().addTo(map.getMap()!);
      geocontrolMounted = true;
    }
  });
</script>

<LeafletMap
  bind:this={map}
  options={{
    zoom,
    zoomControl,
    center
  }}
>
  <TileLayer options={DEFAULT_LAYER_OPTIONS} url={DEFAULT_LAYER} />
  {@render children?.()}
</LeafletMap>
