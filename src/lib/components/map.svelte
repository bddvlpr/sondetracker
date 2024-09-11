<script lang="ts">
  import { DEFAULT_LAYER, DEFAULT_LAYER_OPTIONS, DEFAULT_MAP_OPTIONS } from '$lib/leaflet';
  import 'leaflet/dist/leaflet.css';
  import { LeafletMap, TileLayer } from 'svelte-leafletjs';
</script>

<LeafletMap options={DEFAULT_MAP_OPTIONS}>
  <TileLayer options={DEFAULT_LAYER_OPTIONS} url={DEFAULT_LAYER} />
</LeafletMap>
