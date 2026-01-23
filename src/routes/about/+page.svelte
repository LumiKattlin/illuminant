<script lang="ts">
	import { page } from '$app/state';

	// TODO: put this into a database so it's editable without modifying code
	// (which is probably not a good idea in a production app)
	const bios: {[name: string]: any} = {
		"ne10": {
			text: 'Beyond from just making noise, Ne10 is bringing inspiration to the autism community through sound and creation. Born and raised in Fresno, California. With the high status of autism spectrum disorder, he is willing to make a name for himself. From experimental projects to live sound, he is willing to make audio an immersive experience. Pushing the boundaries and experimenting with sound.'
		},
		"konextrax": {
			text: "Conner Rumsey, professionally known as Konextrax, is a Dance Music Producer hailing from Wisconsin. Born on October 30th, 2005, he's already made a lasting impact in the EDM community, releasing with some underground labels that really pushed his image. As second-in-line of command for the Illuminant Records, he provides a massive impact by being the Lead Advisor, Legal Coach and A&R Help, which have all shown massive impact especially in harder to learn fields of business. Speaking of, he's the head label owner of Frozen Fox Records LLC, which is a creator-first label providing artists with clarity, contract structure and professional protection against new threats within the industry today. Conner has proven time and time again as one of the most, if not, the most reliable business partner and friend of our generation."
		}
	};

	let name: string | null = page.url.searchParams.get('a');
</script>

<main class="page-section">
	<h1>
		{name}
	</h1>
	<p>{bios[name?.toLowerCase() ?? ""].text}</p>
</main>

<style>
	main {
		margin-top: 30px;
	}
</style>
