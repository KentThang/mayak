// Assumes input is a URL
export async function lookupTitle(input: string) {
	let response
	try {
		response = await fetch(
			`http://localhost:3000/api/listening/lookup?q=${encodeURIComponent(input)}`
		)
	} catch (error) {
		console.log(error)
		return
	}

	if (!response.ok) {
		return null
	}

	const data = await response.json()

	console.log(data)

	return data
}

// Assume it is a title if it isn't a valid URL
export function isValidHttpUrl(input: string) {
	let url
	try {
		url = new URL(input)
	} catch (_) {
		return false
	}
	return url.protocol === 'http:' || url.protocol === 'https:'
}
