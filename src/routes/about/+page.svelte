<script lang="ts">
	import { page } from '$app/state';
	import ArtistThumbnail from '$lib/components/artistThumbnail.svelte';
	import type { StaffMember } from '$lib/staffTypes';
	import { onMount } from 'svelte';

	let artistPromise = $state<Promise<StaffMember>>();

	let name: string | null = page.url.searchParams.get('a');
	let isStaff = page.url.searchParams.get('staff');

	onMount(async () => {
		artistPromise = (async () => {
			let response = fetch(isStaff ? '/staff/staff' : '/staff/artists');
			return (await ((await (await response).json()) as Promise<StaffMember[]>)).filter(
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
				<h3>
					<a href={isStaff ? '/staff-hub' : '/artist-hub'}>{isStaff ? '/ A&R /' : '/ Artists /'}</a>
				</h3>
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
