<script lang="ts">
	import { logout } from '$lib/auth/blogAuthClient';
	import { onMount } from 'svelte';

	onMount(() => {
        logout()
        window.location.href = "/"
    });
</script>
