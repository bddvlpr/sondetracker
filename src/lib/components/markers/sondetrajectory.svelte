<script lang="ts">
  import type { Sonde } from '$lib/api';
  import type { History } from '$lib/history';
  import type { LatLngExpression } from 'leaflet';

  import { Polyline } from 'svelte-leafletjs';

  const {
    history
  }: {
    history: History<Sonde>;
  } = $props();

  let latLngs = $derived(
    Object.values(history).map(({ lat, lon }) => [lat, lon] satisfies LatLngExpression)
  );
</script>

<Polyline {latLngs} />
