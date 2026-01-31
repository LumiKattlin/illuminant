<script lang="ts">
	import { getSessionHeaders, getAuth } from '$lib/auth/blogAuthClient';
	import ArtistEdit from '$lib/components/artistEdit.svelte';
	import StaffDescriptionEdit from '$lib/components/staffDescriptionEdit.svelte';
	import type { StaffMember } from '$lib/staffTypes';
	import { onMount } from 'svelte';

	let artistPromise = $state<Promise<StaffMember[]>>();
	let search = $state('');

	async function updateArtists() {
		console.log('reload');
		const found = await fetch('/staff/staff', {
			headers: getSessionHeaders(getAuth()!)
		});

		return await found.json();
	}

	onMount(async () => (artistPromise = updateArtists()));

	async function updateArtist(artist: StaffMember) {
		artistPromise = (async () => {
			await fetch('/staff/staff', {
				method: 'POST',
				headers: getSessionHeaders(getAuth()!),
				body: JSON.stringify(artist)
			});

			return updateArtists();
		})();
	}
</script>

<svelte:head>
	<title>Illuminant &mdash; Edit A&amp;R</title>
</svelte:head>

<main class="page-section">
	<h1>Edit A&amp;R</h1>

	<StaffDescriptionEdit id="staff"/>

	<div class="controls-wrapper">
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
					bio: '',
					isStaff: true
				})}
		>
			<span class="material-symbols-outlined"> add </span>
			New Staff
		</button>

		<input placeholder="Search" bind:value={search} />
	</div>

	<hr />

	{#await artistPromise}
		Loading...
	{:then artists}
		<div class="artist-list">
			{#each artists as artist}
				{#if artist.name.toLowerCase().indexOf(search.toLocaleLowerCase()) != -1}
					<ArtistEdit
						{artist}
						onDeleted={() => (artistPromise = updateArtists())}
						endpoint="/staff/staff"
					></ArtistEdit>
				{/if}
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

	.controls-wrapper {
		width: 100%;
		display: flex;
		gap: 20px;
	}

	.artist-list {
		width: 100%;
		display: flex;
		flex-direction: column;
		gap: 10px;
	}
</style>
