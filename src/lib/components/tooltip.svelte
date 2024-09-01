<script lang="ts">
	import type { Snippet } from 'svelte';
	import type { HTMLAttributes } from 'svelte/elements';

	const {
		data,
		position,
		children,
		...props
	}: {
		data: string;
		position?: 'tooltip-top' | 'tooltip-right' | 'tooltip-bottom' | 'tooltip-left';
		children?: Snippet;
	} & HTMLAttributes<HTMLDivElement> = $props();
</script>

<div class="tooltip {position}" data-tip={data} {...props}>
	{@render children?.()}
</div>
