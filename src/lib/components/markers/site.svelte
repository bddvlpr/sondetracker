<script lang="ts">
  import type { Site } from '$lib/api';

  import { parseLatLng } from '$lib/leaflet';
  import { CircleMarker, Popup } from 'svelte-leafletjs';

  const {
    id,
    site
  }: {
    id: string;
    site: Site;
  } = $props();

  const { station_name, position } = $derived(site);
</script>

{#if position?.length == 2}
  <CircleMarker color="#0000FF" latLng={parseLatLng(position)} radius={5}>
    <Popup>
      {station_name ?? 'Unnamed site'}
      <a href="/sites/{id}">View site</a>
    </Popup>
  </CircleMarker>
{/if}
