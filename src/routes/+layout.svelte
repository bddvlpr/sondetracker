<script lang="ts">
  import Tooltip from '$lib/components/tooltip.svelte';
  import { connectSocket } from '$lib/socket.svelte';
  import { refreshListeners, refreshSites, refreshSondes } from '$lib/telemetry.svelte';
  import Antenna from 'lucide-svelte/icons/antenna';
  import ArrowUpFromLine from 'lucide-svelte/icons/arrow-up-from-line';
  import Map from 'lucide-svelte/icons/map';
  import Radio from 'lucide-svelte/icons/radio';

  import '../app.pcss';

  const anchors = [
    {
      tooltip: 'Map',
      component: Map,
      href: '/map'
    },
    {
      tooltip: 'Sondes',
      component: Radio,
      href: '/sondes'
    },
    {
      tooltip: 'Sites',
      component: ArrowUpFromLine,
      href: '/sites'
    },
    {
      tooltip: 'Stations',
      component: Antenna,
      href: '/stations'
    }
  ];

  const { children } = $props();

  $effect(() => {
    refreshListeners();
    refreshSondes();
    refreshSites();
    connectSocket();
  });
</script>

<div class="flex h-full flex-col">
  <div class="px-4 py-2">
    <div class="navbar rounded-xl bg-base-200">
      <div class="navbar-start">
        <a class="btn btn-ghost text-xl" href="/"> Sonde Tracker </a>
      </div>
      <div class="navbar-end">
        {#each anchors as anchor}
          {@const { tooltip, href } = anchor}
          <Tooltip data={tooltip} position="tooltip-bottom">
            <a class="btn btn-circle btn-ghost" {href}>
              <anchor.component />
            </a>
          </Tooltip>
        {/each}
      </div>
    </div>
  </div>
  <div class="mx-4 my-4 grow rounded-xl bg-base-200">
    {@render children?.()}
  </div>
</div>
