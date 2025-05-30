<script lang="ts">
	import '../app.css';

	let { children } = $props();
</script>

<header>
	<img src="/assets/Illuminant/Logos/Illuminant Wordmark2.png" alt="emblem" />

	<div>
		<a href="/#about">About</a>
		<a href="/#submission">Demo Submissions</a>
		<a href="/#artists">Artists</a>
		<a href="/#contact">Contact</a>
	</div>
</header>

<div class="content">
	<div class="content-body">
		{@render children()}
	</div>
</div>

<style>
	header {
		background-color: var(--color-bg-2);
		font-size: x-large;

		display: flex;
		gap: 48px;
		justify-content: center;
		align-items: center;

		box-shadow: 0px -5px 15px black;

		height: 64px;
		padding-left: 100px;
	}

	header > img {
		height: 48px;
		margin-right: auto;
	}
	header > div {
		height: 100%;
		display: flex;
		align-items: center;
		margin-right: auto;
		gap: 50px;
	}

	header > div > a {
		transition: 0.2s;
		color: var(--color-text);
		text-decoration: underline dotted 1px var(--color-bg-2);
	}

	header > div > a:hover {
		color: rgb(119, 170, 235);
		text-decoration: underline solid 4px rgb(119, 170, 235);
	}

	.content {
		width: 100%;
		overflow-y: scroll;
		height: calc(100vh - 64px);
	}

	.content-body {
		width: 100%;
		display: flex;
		justify-content: center;
	}
</style>
