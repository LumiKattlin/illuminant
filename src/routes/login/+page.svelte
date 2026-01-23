<script lang="ts">
	import { page } from '$app/state';
	import { tryAuth } from '$lib/auth/blogAuthClient';
	import { onMount } from 'svelte';

	let redirect = $state('');
	let user = $state('');
	let password = $state('');

	onMount(() => {
		redirect = page.url.searchParams.get('redirect') ?? '/blog';
	});

	async function login() {
		if (await tryAuth(user, password)) {
			window.location.href = redirect;
		}
	}
</script>

<div class="window-container">
	<main class="window page-section">
		<h1>Login</h1>

		<input class="shadow" placeholder="User" type="text" bind:value={user} />
		<input class="shadow" placeholder="Password" type="password" bind:value={password} />

		<div class="login-controls">
			<button onclick={login} type="submit" class="link-button button">
				<span class="material-symbols-outlined">login</span>
				Login
			</button>
			<a href="/blog" type="submit" class="link-button button-2">
				<span class="material-symbols-outlined">close</span>
				Cancel
			</a>
		</div>
	</main>
</div>

<style>
	.window-container {
		width: 100%;
		height: 100%;

		display: flex;
		align-items: center;
		justify-content: center;
	}

	.window {
		width: 500px;
		height: 400px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 50px;
	}

	.login-controls {
		margin-top: auto;
		display: flex;
		gap: 20px;
		justify-content: end;

		@media (max-width: 1000px) {
			flex-direction: column;
		}
	}

	h1 {
		margin-top: 0;
	}
</style>
