<script lang="ts">
  import type { Snippet } from 'svelte';

  import { DEFAULT_LAYER, DEFAULT_LAYER_OPTIONS, DEFAULT_MAP_OPTIONS } from '$lib/leaflet';
  import L from 'leaflet';
  import 'leaflet.locatecontrol';
  import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
  import 'leaflet/dist/leaflet.css';
  import { LeafletMap, TileLayer } from 'svelte-leafletjs';

  let map: LeafletMap;

  const {
    geolocate = false,
    zoomControl = true,
    children
  }: {
    geolocate?: boolean;
    zoomControl?: boolean;
    children?: Snippet;
  } = $props();

  $effect(() => {
    if (geolocate) {
      L.control.locate().addTo(map.getMap()!);
    }
  });
</script>

<LeafletMap
  bind:this={map}
  options={{
    zoomControl,
    ...DEFAULT_MAP_OPTIONS
  }}
>
  <TileLayer options={DEFAULT_LAYER_OPTIONS} url={DEFAULT_LAYER} />
  {@render children?.()}
</LeafletMap>
