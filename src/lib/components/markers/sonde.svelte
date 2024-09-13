<script lang="ts">
  import type { Sonde } from '$lib/api';
  import type { History } from '$lib/history';

  import { CircleMarker, Popup } from 'svelte-leafletjs';

  import SondeTrajectory from './sondetrajectory.svelte';

  const {
    sonde,
    history
  }: {
    sonde: Sonde;
    history: History<Sonde>;
  } = $props();

  const { type, serial, lat, lon } = $derived(sonde);
</script>

<SondeTrajectory {history} />
<CircleMarker color="#FF00FF" latLng={[lat, lon]} radius={10}>
  <Popup>
    {type}
    <a href="/sondes/{serial}">{serial}</a>
  </Popup>
</CircleMarker>
