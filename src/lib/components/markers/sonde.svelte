<script lang="ts">
  import type { SondeTelemetry } from '$lib/api';
  import type { History } from '$lib/history';

  import { timeAgo } from '$lib/time';
  import { CircleMarker, Popup } from 'svelte-leafletjs';

  import SondeTrajectory from './sondetrajectory.svelte';

  const {
    sonde,
    history
  }: {
    sonde: SondeTelemetry;
    history: History<SondeTelemetry>;
  } = $props();

  const { type, serial, lat, lon, alt, datetime } = $derived(sonde);
</script>

<SondeTrajectory {history} />
<CircleMarker color="#FF00FF" latLng={[lat, lon]} radius={10}>
  <Popup>
    <p>
      <b>{type}</b>
      {serial}
    </p>
    <p>
      <b>Lat</b>
      {lat}
      <br />
      <b>Lon</b>
      {lon}
      <br />
      <b>Alt</b>
      {alt}m
    </p>
    <p>
      <b>Last seen</b>
      {timeAgo(new Date(datetime))}
    </p>
    <p>
      <a href="https://maps.google.com/maps?q={lat},{lon}" target="_blank"> External map </a>
    </p>
  </Popup>
</CircleMarker>
