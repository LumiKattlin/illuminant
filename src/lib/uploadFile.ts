import { getAuth, getSessionHeaders } from "./auth/blogAuthClient";

export async function uploadFile(
	image: FileList,
	onCompleted: (resultImage: string) => void,
	name: string | undefined = undefined
) {
	let reader = new FileReader();

	reader.onload = async (ev) => {
		let resultBuffer = ev.target?.result as ArrayBuffer;
		let headers = getSessionHeaders(getAuth()!);

		headers.append("Content-Type", "image/png");

		let response = await fetch(name ? `/img?id=${encodeURIComponent(name)}` : '/img', {
			method: 'POST',
			headers: headers,
			body: resultBuffer
		});

		onCompleted(await response.text());
	};

	reader.readAsArrayBuffer(image[0]);

}