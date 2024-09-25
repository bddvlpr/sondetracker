<script lang="ts">
  import type { SondeTelemetry } from '$lib/api';
  import type { History } from '$lib/history';
  import type { LatLngExpression } from 'leaflet';

  import { Polyline } from 'svelte-leafletjs';

  const {
    history
  }: {
    history: History<SondeTelemetry>;
  } = $props();

  let latLngs = $derived(
    Object.values(history)
      .sort((a, b) => new Date(b.datetime).getTime() - new Date(a.datetime).getTime())
      .map(({ lat, lon }) => [lat, lon] satisfies LatLngExpression)
  );
</script>

<Polyline {latLngs} />
