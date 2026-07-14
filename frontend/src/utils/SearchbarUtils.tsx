import { COMMANDLINE_ANKIWEB, COMMANDLINE_MK } from '../const/commandLineConsts'

export function executeSearch(query: string) {
	if (query == '') {
		return
	} else if (COMMANDLINE_MK.includes(query)) {
		window.open('https://monkeytype.com/', '_blank')
		return
	} else if (COMMANDLINE_ANKIWEB.includes(query)) {
		window.open('https://ankiweb.net/decks', '_blank')
		return
	} else return lookupDictionary(query)
}

async function lookupDictionary(query: string) {
	let response
	try {
		response = await fetch(
			`http://localhost:3000/api/dictionary/lookup?q=${encodeURIComponent(query)}`
		)
	} catch (error) {
		return
	}

	if (!response.ok) {
		return null
	}

	const data = await response.json()

	return data
}
