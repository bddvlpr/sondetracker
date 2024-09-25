<script lang="ts">
  import type { Sonde } from '$lib/api';
  import type { MapProvider } from 'svelte-leafletjs';

  import SondeMarker from '$lib/components/markers/sonde.svelte';
  import { getLastEntry } from '$lib/history';
  import { client } from '$lib/socket.svelte';
  import { getSondes } from '$lib/telemetry.svelte';
  import { type LatLngExpression, Map } from 'leaflet';
  import { getContext } from 'svelte';

  const mapProvider = getContext<MapProvider>(Map);

  $effect(() => {
    const map = mapProvider();

    map.on('moveend', () => {
      client.unsubscribe('sondes/#');
      if (map.getZoom() >= 6) {
        const bounds = map.getBounds().pad(1);

        for (const history of Object.values(getSondes())) {
          const { lat, lon, serial } = getLastEntry<Sonde>(history);
          const position = [lat, lon] satisfies LatLngExpression;

          if (bounds.contains(position)) {
            client.subscribe(`sondes/${serial}`);
          }
        }
      }
    });
  });
</script>

{#each Object.values(getSondes()) as history}
  {@const sonde = getLastEntry<Sonde>(history)}
  <SondeMarker {history} {sonde} />
{/each}
