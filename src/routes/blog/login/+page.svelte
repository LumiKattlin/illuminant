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
	<main class="window shadow">
		<h2>Login</h2>

		<input class="shadow" placeholder="User" type="text" bind:value={user} />
		<input class="shadow" placeholder="Password" type="password" bind:value={password} />

		<div class="login-controls">
			<button onclick={login} type="submit" class="link-button shadow">
				<span class="material-symbols-outlined">login</span>
				Login
			</button>
			<a href="/blog" type="submit" class="link-button shadow">
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
		width: 300px;
		height: 300px;
		display: flex;
		flex-direction: column;
		gap: 10px;
		padding: 10px;
		border-radius: 5px;
		border: 2px solid var(--color-bg-2);
	}

	.login-controls {
		margin-top: auto;
		display: flex;
		justify-content: end;
	}
</style>
