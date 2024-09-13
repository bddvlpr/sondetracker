<script lang="ts">
  import ListenersLayer from '$lib/components/layers/listeners.svelte';
  import SitesLayer from '$lib/components/layers/sites.svelte';
  import SondesLayer from '$lib/components/layers/sondes.svelte';
  import Map from '$lib/components/map.svelte';
</script>

<Map geolocate={true} scale={true}>
  <ListenersLayer />
  <SitesLayer />
  <SondesLayer />
</Map>
