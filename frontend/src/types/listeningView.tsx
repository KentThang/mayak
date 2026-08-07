export interface ListeningExercise {
	id: string
	title: string
	url: string | null
	createdAt: string
	listens: Listen[]
}

export interface Listen {
	listenedAt: string
	notesDuring: string
	notesAfter: string
	exerciseId: string
}