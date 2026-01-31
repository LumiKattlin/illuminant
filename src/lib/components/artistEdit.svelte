<script lang="ts">
	import { getSessionHeaders, getAuth } from '$lib/auth/blogAuthClient';
	import type { StaffMember } from '$lib/staffTypes';
	import { uploadFile } from '$lib/uploadFile';

	let props: { artist: StaffMember; onDeleted: () => void; endpoint: string } = $props();

	let artistImage = $state<FileList>();
	let loadedImage = $state('');

	let artist = $state(props.artist);
	let changed = $state(false);
	let imageChanged = $state(false);

	function onChanged() {
		changed = true;
	}

	function onChangeImage() {
		onChanged();

		if (!artistImage) {
			return;
		}

		let reader = new FileReader();

		reader.onload = (ev) => {
			loadedImage = ev.target?.result as string;
		};

		reader.readAsDataURL(artistImage[0]);
		imageChanged = true;
	}

	async function save() {
		if (!artist.image && !artistImage && !confirm('No image set. Is this OK?')) {
			return;
		}

		if (artistImage && imageChanged) {
			imageChanged = false;

			uploadFile(artistImage, (name) => {
				artist.image = name;
				artistImage = undefined;
				save();
			});
		}

		await fetch(props.endpoint, {
			method: 'POST',
			headers: getSessionHeaders(getAuth()!),
			body: JSON.stringify(artist)
		});
		changed = false;
	}

	async function deleteEntry() {
		if (!confirm('Really delete this entry?')) {
			return;
		}

		await fetch(props.endpoint, {
			method: 'DELETE',
			headers: getSessionHeaders(getAuth()!),
			body: JSON.stringify(artist)
		});
		props.onDeleted();
	}
</script>

<div class="artist-entry shadow">
	<div class="entry-buttons">
		<input onchange={onChanged} placeholder="Name" bind:value={artist.name} />
		<input onchange={onChanged} placeholder="Description" bind:value={artist.description} />
		<span class="visibility-area">
			<input
				onchange={onChanged}
				id="visibility-checkbox"
				type="checkbox"
				class="visibility-checkbox"
				oninput={(event) => console.log(event)}
				bind:checked={artist.visible}
			/>
			<label for="visibility-checkbox">Visible</label>
		</span>
	</div>

	<div class="edit-content">
		<textarea onchange={onChanged} placeholder="Bio" bind:value={artist.bio}></textarea>
		<section>
			<div class="preview-title">Thumbnail Preview</div>
			<div class="preview-wrapper">
				<div class="preview-content">
					<div
						class="artist-image-preview"
						style="background: radial-gradient({artist.color1}, {artist.color2})"
					>
						{#if artistImage}
							<img class="artist-logo" alt={artist.name} src={loadedImage} />
						{:else if artist.image}
							<img class="artist-logo" alt={artist.name} src="/img?id={artist.image}" />
						{/if}
					</div>
					<div class="description">
						<h3>
							{artist.name}
						</h3>
						<p>
							{artist.description}
						</p>
					</div>
				</div>
			</div>

			<input class="preview-footer" type="file" onchange={onChangeImage} bind:files={artistImage} />

			<div>
				<h4>Colors</h4>
				<div class="color-pickers">
					<input class="color-input" type="color" bind:value={artist.color1} onchange={onChanged} />
					<input class="color-input" type="color" bind:value={artist.color2} onchange={onChanged} />
				</div>
			</div>
		</section>
	</div>

	<div class="entry-buttons">
		{#if changed}
			<div class="unsaved-tag">
				<span class="material-symbols-outlined unsaved-icon"> warning </span>
				Unsaved
			</div>
		{/if}
		<button class="link-button button apply-button" onclick={deleteEntry}>
			<span class="material-symbols-outlined unsaved-icon"> delete </span>
			Delete
		</button>
		<button class="link-button button-2" onclick={save}>
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
		box-sizing: border-box;
		gap: 10px;
		display: flex;
		flex-direction: row;
		margin-top: 10px;
		margin-bottom: 10px;
		flex-wrap: wrap;
	}

	.description {
		display: flex;
		flex-direction: column;
		width: 100%;
		align-items: center;
	}

	.artist-logo {
		width: 125px;
	}

	.preview-wrapper {
		border: 2px solid var(--color-bg);
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		justify-items: center;
		padding: 5px;
		align-items: center;
	}

	.preview-title {
		box-sizing: border-box;
		padding: 5px;
		background-color: var(--color-bg);
		border-top-right-radius: 8px;
		border-top-left-radius: 8px;
	}

	.preview-footer {
		margin: 0;
		border-radius: 0;
		border: 2px solid var(--color-bg);
		border-bottom-right-radius: 8px;
		border-bottom-left-radius: 8px;
	}

	h3 {
		margin: 0;
	}

	h4 {
		margin: 0;
	}

	p {
		margin: 0;
	}

	.color-input {
		width: 75px;
		height: 50px;
	}

	.unsaved-tag {
		font-size: 13px;
		background-color: var(--color-bg);
		padding: 8px;
		border-radius: 16px;

		display: flex;
		align-items: center;
		box-shadow: 0 0 10px red;
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
		width: calc(100% - 330px);
		height: 400px;
		resize: vertical;
		padding: 10px;

		background-color: var(--color-bg);
		border: 0;
		color: var(--color-text);

		
		@media (max-width: 1000px) {
			width: 100%;
			resize: none;
		}

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
		height: 150px;
		width: 200px;
		border-radius: 7px;
		display: flex;
		justify-content: center;
		align-items: center;
	}
</style>
