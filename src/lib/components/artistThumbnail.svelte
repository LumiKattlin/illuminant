<script lang="ts">
	import type { StaffMember } from '$lib/staffTypes';

	let { artist }: { artist: StaffMember } = $props();
</script>

<div class="artist-image" style="background: radial-gradient({artist.color1}, {artist.color2})">
	<img alt={artist.name} class="artist-logo" src="/img?id={artist.image}" />
</div>

<style>
	.artist-image {
		width: 300px;
		height: 200px;
		border-radius: 15px;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.artist-logo {
		width: 250px;
	}
</style>
