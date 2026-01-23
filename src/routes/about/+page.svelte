<script lang="ts">
	import { page } from '$app/state';
	import ArtistThumbnail from '$lib/components/artistThumbnail.svelte';
	import type { Artist } from '$lib/staffTypes';
	import { onMount } from 'svelte';

	let artistPromise = $state<Promise<Artist>>();

	let name: string | null = page.url.searchParams.get('a');

	onMount(async () => {
		artistPromise = (async () => {
			let response = fetch('staff/artists');
			return (await ((await (await response).json()) as Promise<Artist[]>)).filter(
				(a) => a.id == name
			)[0];
		})();
	});
</script>

<main class="page-section">
	{#await artistPromise}
		<h3>Loading...</h3>
	{:then artist}
		<div class="page-heading">
			{#if artist}
				<ArtistThumbnail artist={artist!}></ArtistThumbnail>
			{/if}
			<div class="heading-text">
				<h3><a href="/artist-hub">/ Artists /</a></h3>
				<h1>{artist?.name}</h1>
				<h3>{artist?.description}</h3>
			</div>
		</div>
		<h3>About</h3>
		<p>
			{artist?.bio}
		</p>
	{/await}
</main>

<style>
	main {
		box-sizing: border-box;
		margin-top: 30px;
		width: min(100%, 1000px);
	}

	h3 {
		font-size: 17px;
		color: lightgrey;
	}

	.page-heading {
		display: flex;
		gap: 20px;

		@media (max-width: 1000px) {
			flex-direction: column-reverse;
			align-items: center;
		}
	}
	.heading-text {
		@media (max-width: 1000px) {
			width: 100%;
		}
	}
</style>
