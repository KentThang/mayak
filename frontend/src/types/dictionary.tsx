export interface DictionaryResult {
	head: {}
	def: Definition[]
}

interface Definition {
	text: string
	pos: string
	tr: Translation[]
}

interface Translation {
	text: string
	pos: string
	mean: Meaning[]
}

interface Meaning {
	text: string
}