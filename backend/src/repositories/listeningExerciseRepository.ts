import { prisma } from '../db/prisma.ts'

export async function createListeningExercise(title: string, url: string) {
	await prisma.listeningExercise.create({
		data: {
			title,
			url,
		},
	})
}
