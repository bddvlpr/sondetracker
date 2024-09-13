<script lang="ts">
  import ListenerMarker from '$lib/components/markers/listener.svelte';
  import { getListeners } from '$lib/telemetry.svelte';
</script>

{#each getListeners() as listener}
  <ListenerMarker {listener} />
{/each}
