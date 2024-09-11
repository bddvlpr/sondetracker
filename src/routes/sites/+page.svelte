<script lang="ts">
  import Map from '$lib/components/map.svelte';
  import { getLatLng } from '$lib/leaflet';
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
        {@const latLng = getLatLng(position ?? [0, 0])}
        <tr>
          <td>
            #{id}
          </td>
          <td>
            <div class="avatar">
              <div class="h-48 w-48">
                <Map zoom={12} zoomControl={false} center={latLng}>
                  <CircleMarker {latLng} radius={7} />
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
              target="_blank"
              href="https://maps.apple.com/?ll={latLng}"
              class="btn btn-ghost btn-xs">Map</a
            >
          </th>
        </tr>
      {/each}
    </tbody>
  </table>
</div>
