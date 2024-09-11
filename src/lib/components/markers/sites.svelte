<script lang="ts">
  import { getLatLng } from '$lib/leaflet';
  import { getSites } from '$lib/telemetry.svelte';
  import { CircleMarker, Popup } from 'svelte-leafletjs';
</script>

{#each Object.entries(getSites()) as [id, { station_name, position }]}
  {#if position?.length == 2}
    <CircleMarker latLng={getLatLng(position)} radius={5}>
      <Popup>
        {station_name ?? 'Unnamed site'}
        <a href="/sites/{id}">View site</a>
      </Popup>
    </CircleMarker>
  {/if}
{/each}
