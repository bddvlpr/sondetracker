<script lang="ts">
  import type { SondeTelemetry } from '$lib/api';
  import type { History } from '$lib/history';

  import { CircleMarker, Popup } from 'svelte-leafletjs';

  import SondeTrajectory from './sondetrajectory.svelte';

  const {
    sonde,
    history
  }: {
    sonde: SondeTelemetry;
    history: History<SondeTelemetry>;
  } = $props();

  const { type, serial, lat, lon, uploaders } = $derived(sonde);
</script>

<SondeTrajectory {history} />
<CircleMarker color="#FF00FF" latLng={[lat, lon]} radius={10}>
  <Popup>
    {type}
    <p>
      {lat}
      {lon}
    </p>

    {uploaders?.length}

    <a href="/sondes/{serial}">{serial}</a>
  </Popup>
</CircleMarker>
