<script lang="ts">
	import { getSessionHeaders, getAuth } from '$lib/auth/blogAuthClient';
	import ArtistEdit from '$lib/components/artistEdit.svelte';
	import type { Artist } from '$lib/staffTypes';
	import { onMount } from 'svelte';

	let artistPromise = $state<Promise<Artist[]>>();

	async function updateArtists() {
		console.log('reload');
		const found = await fetch('/staff/artists', {
			headers: getSessionHeaders(getAuth()!)
		});

		return await found.json();
	}

	onMount(async () => (artistPromise = updateArtists()));

	async function updateArtist(artist: Artist) {
		artistPromise = (async () => {
			await fetch('/staff/artists', {
				method: 'POST',
				headers: getSessionHeaders(getAuth()!),
				body: JSON.stringify(artist)
			});

			return updateArtists();
		})();
	}
</script>

<main class="page-section">
	<h1>Edit Artists</h1>

	<button
		class="link-button button"
		onclick={() =>
			updateArtist({
				id: '',
				name: '',
				description: '',
				visible: false,
				color1: '',
				color2: '',
				image: '',
				bio: ''
			})}
	>
		<span class="material-symbols-outlined"> add </span>
		New Artist
	</button>

	<hr />

	{#await artistPromise}
		Loading...
	{:then artists}
		<div class="artist-list">
			{#each artists as artist}
				<ArtistEdit {artist} onDeleted={() => (artistPromise = updateArtists())}></ArtistEdit>
			{/each}
		</div>
	{/await}
</main>

<style lang="css">
	main {
		margin-top: 30px;
		width: min(100%, 1200px);
	}

	hr {
		margin-top: 20px;
		margin-bottom: 20px;
	}

	.artist-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
