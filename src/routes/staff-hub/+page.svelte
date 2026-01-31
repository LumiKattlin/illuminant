<script lang="ts">
	import StaffPage from '$lib/components/staffPage.svelte';
</script>

<svelte:head>
	<title>Illuminant A&amp;R and Staff</title>
</svelte:head>

<main class="page-section">
	<StaffPage id="staff" title="A&R" source="/staff/staff">

	</StaffPage>
</main>

<style>
	main {
		box-sizing: border-box;
		margin-top: 30px;
		width: min(100%, 1200px);
	}
</style>
