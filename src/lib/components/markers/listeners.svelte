<script lang="ts">
  import { getListeners } from '$lib/telemetry.svelte';
  import { CircleMarker, Popup } from 'svelte-leafletjs';
</script>

{#each getListeners() as { uploader_callsign, uploader_position }}
  {#if uploader_position?.length == 3}
    <CircleMarker latLng={[uploader_position[0], uploader_position[1]]} radius={5} color="#00FF00">
      <Popup>
        {uploader_callsign ?? 'Unnamed site'}
      </Popup>
    </CircleMarker>
  {/if}
{/each}
