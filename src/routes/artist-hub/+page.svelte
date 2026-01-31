<script lang="ts">
	import StaffPage from '$lib/components/staffPage.svelte';
</script>

<svelte:head>
	<title>Illuminant Artists</title>
</svelte:head>

<main class="page-section">
	<StaffPage title="Artists" id="artists" source="/staff/artists"></StaffPage>
</main>

<style>
	main {
		box-sizing: border-box;
		margin-top: 30px;
		width: min(100%, 1200px);
	}
</style>
