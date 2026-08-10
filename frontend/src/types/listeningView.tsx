export interface ListeningExercise {
	id: string
	title: string
	url: string | null
	createdAt: string
}

export interface Listen {
	id: string
	listenedAt: string
	notesDuring: string
	notesAfter: string
	exerciseId: string
}