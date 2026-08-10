import { prisma } from '../db/prisma.ts'

export async function createListeningExercise(title: string, url: string) {
	await prisma.listeningExercise.create({
		data: {
			title,
			url,
		},
	})
}

export async function fetchAllListeningExercises() {
	return prisma.listeningExercise.findMany({
		select: {
			id: true,
			title: true,
			url: true,
			createdAt: true,
		},
	})
}