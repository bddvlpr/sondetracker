<script lang="ts">
  import Map from '$lib/components/map.svelte';
  import SiteMarkers from '$lib/components/markers/sites.svelte';
  import ListenerMarkers from '$lib/components/markers/listeners.svelte';
</script>

<Map geolocate={true}>
  <ListenerMarkers />
  <!-- <SiteMarkers /> -->
</Map>
