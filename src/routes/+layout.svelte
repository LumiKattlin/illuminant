<script lang="ts">
	import { hasBlogAuth } from '$lib/auth/blogAuthClient';
	import { onMount } from 'svelte';
	import '../app.css';

	let { children } = $props();

	let navVisible = $state(false);
	let hasAuth = $state(false);

	function toggleNav() {
		navVisible = !navVisible;
		document.getElementById('nav')?.classList.toggle('nav-hidden');
	}

	onMount(() => {
		hasAuth = hasBlogAuth();
	});
</script>

<header>
	<button onclick={toggleNav}>
		<span class="material-symbols-outlined"> menu </span>
	</button>

	<a class="logo-container" href="/">
		<img src="/assets/Illuminant/Logos/Illuminant Wordmark2.png" alt="emblem" />
	</a>

	<nav>
		<a href="/#about">About</a>
		<a href="/#submission">Demo Submissions</a>
		<a href="/#artists">Artists</a>
		<a href="/#contact">Contact</a>
		<hr />
		<a href="/blog">Blog</a>
		{#if hasAuth}
			<a href="/blog/edit">Edit</a>
			<a href="/blog/logout">Log out</a>
		{/if}
	</nav>
</header>

<nav id="nav" class="nav-hidden mobile-nav shadow">
	<a href="/#about" onclick={toggleNav}>About</a>
	<a href="/#submission" onclick={toggleNav}>Demo Submissions</a>
	<a href="/#artists" onclick={toggleNav}>Artists</a>
	<a href="/#contact" onclick={toggleNav}>Contact</a>
	<hr />
	<a href="/blog" onclick={toggleNav}>Blog</a>
	{#if hasAuth}
		<a href="/blog/edit" onclick={toggleNav}>Edit</a>
		<a href="/blog/logout" onclick={toggleNav}>Log out</a>
	{/if}
</nav>

<div class="content">
	<div class="content-body">
		<div class="container">
			{@render children()}
		</div>
	</div>
</div>

<style>
	header {
		background-color: var(--color-bg-2);
		font-size: x-large;

		display: flex;
		gap: 48px;
		justify-items: center;
		align-items: center;

		box-shadow: 0px -5px 15px var(--color-shadow);

		height: 64px;
		padding-left: 25px;

		@media (max-width: 1400px) {
			padding-left: 10px;
			padding-right: 10px;
		}
	}

	.logo-container > img {
		height: 48px;
		width: auto;
	}

	.logo-container {
		width: fit-content;
		@media (max-width: 1000px) {
			position: absolute;
			left: 30%;
			width: 40%;
			height: 60px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}

	.mobile-nav {
		@media (min-width: 1000px) {
			height: 0;
			visibility: collapse;
		}
		backdrop-filter: blur(10px);
		background: rgba(113, 38, 236, 0.6);
	}

	header > nav {
		height: 100%;
		width: 100%;
		display: flex;
		align-items: center;
		margin-right: auto;
		gap: 50px;

		@media (max-width: 1200px) {
			gap: 30px;
		}

		@media (max-width: 1000px) {
			display: none;
		}
	}

	nav > hr {
		display: flex;
		width: 1px;
		height: 40px;
		background-color: var(--color-text);
		margin-right: -10px;
		margin-left: -10px;

		@media (max-width: 1000px) {
			margin-right: 5px;
			margin-left: 5px;
			width: auto;
			height: 1px;
			margin-top: -5px;
			margin-bottom: -5px;
		}
	}

	header > button {
		transition: 0.2s;
		border-radius: 100%;
		width: 40px;
		height: 40px;
		padding-top: 3px;
		display: none;
		@media (max-width: 1000px) {
			display: block;
		}
	}

	header > button:hover {
		background-color: var(--color-bg-3);
	}

	nav > a {
		transition: 0.2s;
		color: var(--color-text);
		text-decoration: underline dotted 1px var(--color-bg-2);

		@media (max-width: 1000px) {
			font-size: large;
			margin-left: 10px;
		}
	}

	nav > a:hover {
		color: rgb(119, 170, 235);
		text-decoration: underline solid 4px rgb(119, 170, 235);
	}

	nav {
		@media (max-width: 1000px) {
			opacity: 1;
			transition: 0.2s;
			border: 2px solid var(--color-bg-3);
			border-radius: 10px;
			backdrop-filter: blur(10px);

			margin: 10px;
			padding: 10px;

			width: 225px;

			display: flex;
			flex-direction: column;
			gap: 20px;
			background-color: var(--color-bg-2);

			position: absolute;
			height: calc(100vh - 84px);
		}
	}

	.nav-hidden {
		opacity: 0;
		pointer-events: none;
	}

	.content {
		width: 100%;
		overflow-y: auto;
		overflow-x: hidden;
		scrollbar-color: var(--color-text) var(--color-bg);
		height: calc(100vh - 64px);
	}

	.content-body {
		width: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
	}

	.container {
		height: 100%;
		width: min(100%, 1000px);
	}
</style>
