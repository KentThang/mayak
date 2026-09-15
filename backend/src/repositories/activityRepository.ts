import { prisma } from '../db/prisma.ts'

export async function createActivity(activityTitle: string, secondsSpent: number) {
	await prisma.activity.create({
		data: {
			activityTitle,
			secondsSpent,
		},
	})
}