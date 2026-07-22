import { Router } from 'express'
import { syncMonkeytype } from '../sync/monkeytypeSync.ts'
import {
	getAllStoredMonkeytypeResults,
	getDailyMonkeytypeResultsCount,
	getLatestMonkeytypeResult,
	getRecordMonkeytypeResult,
} from '../repositories/monkeytypeRepository.ts'

const router = Router()

// Queries DB to get the latest Monkeytype test stored in DB and then uses it to fetch all the Monkeytype results dated after its timestamp.
// Saves these new Monkeytype results in DB
// Queries DB for the test with the highest recorded WPM and queries DB for count of Monkeytype tests done today
router.get('/', async (_, res) => {
	const latest = await getLatestMonkeytypeResult()
	await syncMonkeytype(latest?.timestamp)

	const bestTest = await getRecordMonkeytypeResult()

	const testsToday = await getDailyMonkeytypeResultsCount()

	// potentially move this logic elsewhere
	const allMonkeytypeTestsFromDB = await getAllStoredMonkeytypeResults()

	const grouped = allMonkeytypeTestsFromDB.reduce<Record<string, number>>(
		(acc, result) => {
			const date = new Date(Number(result.timestamp))
				.toISOString()
				.split('T')[0]

			if (!date) return acc

			acc[date] = (acc[date] ?? 0) + 1

			return acc
		},
		{}
	)

	const heatmap = Object.entries(grouped).map(([date, monkeytype]) => ({
		date,
		count: monkeytype,
		monkeytype,
	}))

	res.json({
		monkeytype: {
			testsToday,
		},
		heatmap: heatmap,
		latest: {
			wpm: latest?.wpm,
			characters: latest?.characters,
			accuracy: latest?.accuracy,
		},
		bestTest: {
			wpm: bestTest?.wpm,
			characters: bestTest?.characters,
			accuracy: bestTest?.accuracy,
		},
	})
})

export default router
