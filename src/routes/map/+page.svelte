<script lang="ts">
  import Map from '$lib/components/map.svelte';
  import StationMarkers from '$lib/components/markers/station.svelte';

  const { data } = $props();
</script>

<Map geolocate={true}>
  {#await data.stations then stations}
    <StationMarkers {stations} />
  {/await}
</Map>
