<script lang="ts">
  import SiteMarker from '$lib/components/markers/site.svelte';
  import { getSites } from '$lib/telemetry.svelte';
</script>

{#each Object.entries(getSites()) as [id, site]}
  <SiteMarker {id} {site} />
{/each}
