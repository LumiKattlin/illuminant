<script lang="ts">
	import ArtistList from '$lib/components/artistList.svelte';
	import type { Artist } from '$lib/staffTypes';
	import { onMount } from 'svelte';

	let artistPromise = $state<Promise<Artist[]>>();

	onMount(async () => {
		const found = fetch('/staff/artists');

		artistPromise = (await found).json();
	});
</script>

<main class="page-section">
	<h1 class="heading">Artists</h1>

	<p>Some text here probably</p>
	{#await artistPromise}
		<h2>Loading...</h2>
	{:then loadedArtists}
		<div class="artist-card-container">
			<ArtistList artists={loadedArtists ?? []} />
		</div>
	{/await}
</main>

<style>
	main {
		margin-top: 30px;
	}

	.artist-card-container {
		gap: 50px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		margin-top: 80px;
	}

	h1 {
		margin-top: 0;
	}
</style>
