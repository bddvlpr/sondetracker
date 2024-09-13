<script lang="ts">
  import type { Sonde } from '$lib/api';
  import Map from '$lib/components/map.svelte';
  import SondeMarker from '$lib/components/markers/sonde.svelte';
  import { getLastEntry } from '$lib/history';
  import { getSondes } from '$lib/telemetry.svelte';

  const sondes = $derived(Object.values(getSondes()));
</script>

<div class="flex justify-center flex-wrap gap-4">
  {#key sondes}
    {#each sondes as history}
      {@const sonde = getLastEntry<Sonde>(history)}
      {@const { lat, lon, serial, type, datetime } = sonde}
      <div class="card bg-base-100 w-96 shadow-xl">
        <figure class="h-48">
          <Map
            options={{
              attributionControl: false,
              center: [lat, lon],
              zoom: 12,
              zoomControl: false
            }}
          >
            <SondeMarker {sonde} {history} />
          </Map>
        </figure>
        <div class="card-body">
          <h2 class="card-title">
            {serial}
            <span class="badge badge-primary">{type}</span>
          </h2>
          <p>Last seen {new Date(datetime).toLocaleString()}.</p>
          <p>Currently at {lat} {lon}.</p>
          <div class="card-actions justify-end">
            <button class="btn btn-disabled">Map</button>
          </div>
        </div>
      </div>
    {/each}
  {/key}
</div>
