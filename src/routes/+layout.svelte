<script lang="ts">
	import Tooltip from '$lib/components/tooltip.svelte';
	import Map from 'lucide-svelte/icons/map';
	import Radio from 'lucide-svelte/icons/radio';

	import '../app.css';

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
		}
	];

	const { children } = $props();
</script>

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

{@render children()}
