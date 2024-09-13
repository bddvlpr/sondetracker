<script lang="ts">
  import Map from '$lib/components/map.svelte';
  import { parseLatLng } from '$lib/leaflet';
  import { getSites } from '$lib/telemetry.svelte';
  import { CircleMarker } from 'svelte-leafletjs';

  const PER_PAGE = 10;

  let page = $state(0);
  let elements = $derived.by(() => {
    let startIndex = PER_PAGE * page;
    let endIndex = startIndex + PER_PAGE;

    return Object.entries(getSites()).slice(startIndex, endIndex);
  });
</script>

{#key page}
  <div class="overflow-x-auto">
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Map</th>
          <th>Name</th>
          <th>Launch times</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {#each elements as [id, { station_name, position }]}
          {@const latLng = parseLatLng(position ?? [0, 0])}
          <tr>
            <td>
              #{id}
            </td>
            <td>
              <div class="avatar">
                <div class="h-48 w-48">
                  <Map
                    options={{
                      attributionControl: false,
                      center: latLng,
                      zoom: 12,
                      zoomControl: false
                    }}
                  >
                    <CircleMarker radius={7} {latLng} />
                  </Map>
                </div>
              </div>
            </td>
            <td class="min-w-56">
              {station_name} <br />
              <span class="badge badge-primary badge-sm">{latLng.join(' ')}</span>
            </td>
            <td>undefined</td>
            <th>
              <a
                class="btn btn-ghost btn-xs"
                href="https://maps.apple.com/?ll={latLng}"
                target="_blank">Map</a
              >
            </th>
          </tr>
        {/each}
      </tbody>
    </table>
  </div>
{/key}
<div class="mx-auto w-fit">
  <div>
    <div class="join">
      <button class="btn join-item" disabled={page <= 0} onclick={() => page--}>«</button>
      <button class="btn join-item">Page {page + 1}</button>
      <button class="btn join-item" onclick={() => page++}>»</button>
    </div>
  </div>
</div>
