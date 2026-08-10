import { prisma } from '../db/prisma.ts'

export async function fetchAllPastListensWithExerciseId(exerciseId: string) {
	return prisma.listen.findMany({
		where: {
			exerciseId: exerciseId,
		},
		select: {
			id: true,
			listenedAt: true,
			notesDuring: true,
			notesAfter: true,
		},
	})
}