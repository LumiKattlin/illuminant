<script lang="ts">
	import { redirectIfNoAuth } from '$lib/auth/blogAuthClient';
	import { onMount } from 'svelte';
	let { children } = $props();
	let hasAuth = $state(false);

	onMount(() => {
		hasAuth = !redirectIfNoAuth();
	});
</script>

<svelte:head>
	<title>Illuminant &mdash; Edit Blog</title>
</svelte:head>

{#if hasAuth}
	{@render children()}
{/if}
