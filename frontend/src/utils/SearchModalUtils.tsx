import { type NavigateFunction } from 'react-router-dom'
import {
	COMMANDLINE_ACTIVEUSE,
	COMMANDLINE_ANKIWEB,
	COMMANDLINE_LISTENING,
	COMMANDLINE_MK,
} from '../const/commandLineConsts'

// TODO: rewrite to be more clean and consider command prefix to differentiate between dictionary lookup and internal command
export function executeSearch(query: string, navigate: NavigateFunction) {
	if (query == '') {
		return
	} else if (COMMANDLINE_MK.includes(query)) {
		window.open('https://monkeytype.com/', '_blank')
		return
	} else if (COMMANDLINE_ANKIWEB.includes(query)) {
		window.open('https://ankiweb.net/decks', '_blank')
		return
	} else if (COMMANDLINE_LISTENING.includes(query)) {
		navigate('/listening')
		return
	} else if (COMMANDLINE_ACTIVEUSE.includes(query)) {
		navigate('/activeuse')
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
