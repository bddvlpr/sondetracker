<script lang="ts">
  import type { Snippet } from 'svelte';

  import { DEFAULT_LAYER, DEFAULT_LAYER_OPTIONS, DEFAULT_MAP_OPTIONS } from '$lib/leaflet';
  import L, { type MapOptions } from 'leaflet';
  import 'leaflet.locatecontrol';
  import 'leaflet.locatecontrol/dist/L.Control.Locate.min.css';
  import 'leaflet/dist/leaflet.css';
  import { LeafletMap, ScaleControl, TileLayer } from 'svelte-leafletjs';

  let map: LeafletMap;
  let geocontrolMounted = false;

  const {
    scale = false,
    geolocate = false,
    options,
    children
  }: {
    scale?: boolean;
    geolocate?: boolean;
    options?: MapOptions;
    children?: Snippet;
  } & MapOptions = $props();

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
    ...DEFAULT_MAP_OPTIONS,
    ...options
  }}
>
  {#if scale}
    <ScaleControl />
  {/if}
  <TileLayer options={{ ...DEFAULT_LAYER_OPTIONS }} url={DEFAULT_LAYER} />
  {@render children?.()}
</LeafletMap>
