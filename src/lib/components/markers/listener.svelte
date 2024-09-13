<script lang="ts">
  import type { Listener } from '$lib/api';

  import { parseLatLng } from '$lib/leaflet';
  import { CircleMarker, Popup } from 'svelte-leafletjs';

  const {
    listener
  }: {
    listener: Listener;
  } = $props();

  const { uploader_callsign, uploader_position } = $derived(listener);
</script>

{#if uploader_position?.length == 3}
  <CircleMarker color="#00FF00" latLng={parseLatLng(uploader_position)} radius={5}>
    <Popup>
      {uploader_callsign ?? 'Unnamed listener'}
    </Popup>
  </CircleMarker>
{/if}
