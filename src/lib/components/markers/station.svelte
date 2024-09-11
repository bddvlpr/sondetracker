<script lang="ts">
  import { getLatLng } from '$lib/leaflet';
  import { CircleMarker, Popup } from 'svelte-leafletjs';

  const {
    stations
  }: {
    stations: {
      [id: string]: {
        station_name?: string;
        position?: number[];
      };
    };
  } = $props();
</script>

{#each Object.entries(stations) as [id, { station_name, position }]}
  {#if position?.length == 2}
    <CircleMarker latLng={getLatLng(position)} radius={5}>
      <Popup>
        {station_name ?? 'Unnamed station'}
        <a href="/sites/{id}">View site</a>
      </Popup>
    </CircleMarker>
  {/if}
{/each}
