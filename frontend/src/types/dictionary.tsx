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
}
