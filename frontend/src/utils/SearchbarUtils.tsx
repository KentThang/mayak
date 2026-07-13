import { COMMANDLINE_ANKIWEB, COMMANDLINE_MK } from '../const/commandLineConsts'

export function executeSearch(query: string) {
	if (COMMANDLINE_MK.includes(query))
		window.open('https://monkeytype.com/', '_blank')
	else if (COMMANDLINE_ANKIWEB.includes(query))
		window.open('https://ankiweb.net/decks', '_blank')
	else console.log(query + " " + detectLanguage(query))
	// add yandex dictionary integration here

	return
}

function detectLanguage(query: string): "en" | "ru" {
  return /\p{Script=Cyrillic}/u.test(query) ? "ru" : "en";
}
