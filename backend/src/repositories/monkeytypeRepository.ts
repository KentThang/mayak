import { prisma } from '../db/prisma.ts'
import type { MonkeytypeResult } from '../generated/prisma/client.ts'

// Get latest test result in DB
export function getLatestMonkeytypeResult() {
	return prisma.monkeytypeResult.findFirst({
		orderBy: {
			timestamp: 'desc',
		},
	})
}

// Store fetched test results in DB
export async function saveMonkeytypeResults(results: MonkeytypeResult[]) {
	for (const result of results) {
		await prisma.monkeytypeResult.upsert({
			where: {
				id: result.id,
			},
			create: result,
			update: {},
		})
	}
}

// Fetches all test results from DB from today
export async function getDailyMonkeytypeResultsCount() {
	const startOfDay = new Date()
	startOfDay.setHours(0, 0, 0, 0)
	return prisma.monkeytypeResult.count({
		where: {
			timestamp: {
				gt: startOfDay.getTime(),
			},
		},
	})
}

// Fetches all test results from DB
export async function getAllStoredMonkeytypeResults() {
	return prisma.monkeytypeResult.findMany({
		select: {
			id: true,
			timestamp: true,
		},
	})
}

// Fetches the best (WPM) result from DB
export async function getRecordMonkeytypeResult() {
	return prisma.monkeytypeResult.findFirst({
		orderBy: {
			wpm: 'desc',
		},
	})
}
