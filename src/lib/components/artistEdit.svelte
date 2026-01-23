<script lang="ts">
	import type { Artist } from '$lib/staffTypes';

	let initialProps: { artist: Artist } = $props();

	let artist = $state(initialProps.artist);
</script>

<div class="artist-entry shadow">
	<div class="entry-buttons">
		<input placeholder="Name" bind:value={artist.name} />
		<input placeholder="Description" bind:value={artist.description} />
		<span class="visibility-area">
			<input id="visibility-checkbox" type="checkbox" class="visibility-checkbox" />
			<label for="visibility-checkbox">Visible</label>
		</span>
	</div>

	<div class="edit-content">
		<textarea placeholder="Information">{artist.description}</textarea>
		<section>
			<h2>Image</h2>

			<div class="artist-image"></div>

			<button class="link-button button">Upload</button>
			
			<div
				class="artist-image-preview"
				style="background: radial-gradient({artist.color1}, {artist.color2})"
			>
				{artist.name}
			</div>
			<div>
				<h4>Colors</h4>
				<input type="color" bind:value={artist.color1} />
				<input type="color" bind:value={artist.color2} />
			</div>

		</section>
	</div>

	<div class="entry-buttons">
		<div class="unsaved-tag">
			<span class="material-symbols-outlined unsaved-icon"> warning </span>
			Unsaved
		</div>
		<button class="link-button button-2 apply-button">
			<span class="material-symbols-outlined unsaved-icon"> save </span>
			Save
		</button>
	</div>
</div>

<style>
	.apply-button {
		margin-left: auto;
	}

	.edit-content {
		gap: 10px;
		display: flex;
		flex-direction: row;
	}

	h4 {
		margin: 0;
	}

	.unsaved-tag {
		font-size: 13px;
		background-color: var(--color-bg-highlight);
		padding: 8px;
		border-radius: 16px;

		display: flex;
		align-items: center;
	}

	.unsaved-icon {
		font-size: 20px;
	}

	.artist-entry {
		width: 100%;
		padding: 10px;
		border-radius: 15px;
		background-color: var(--color-bg-2);
		box-sizing: border-box;
	}

	.entry-buttons {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 20px;
	}

	.entry-buttons > input {
		width: auto;
		box-sizing: border-box;
	}

	textarea {
		box-sizing: border-box;
		width: calc(100% - 300px);
		height: 200px;
		resize: vertical;
		padding: 10px;
		margin-top: 10px;
		margin-bottom: 10px;

		background-color: var(--color-bg);
		border: 2px solid var(--color-bg-2);
		color: var(--color-text);
	}

	.visibility-area {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		gap: 5px;
	}

	.visibility-checkbox {
		width: 24px;
		height: 24px;
	}

	.artist-image-preview {
		width: 150px;
		height: 200px;
		border-radius: 7px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
