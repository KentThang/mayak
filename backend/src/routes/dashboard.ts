import { Router } from 'express'
import { syncMonkeytype } from '../sync/monkeytypeSync.ts'
import {
	getAllStoredMonkeytypeResults,
	getDailyMonkeytypeResultsCount,
} from '../repositories/monkeytypeRepository.ts'

const router = Router()

router.get('/', async (_, res) => {
	await syncMonkeytype()

	const testsToday = await getDailyMonkeytypeResultsCount()

	// potentially move this logic elsewhere
	const allTestsFromDB = await getAllStoredMonkeytypeResults()

	const grouped = allTestsFromDB.reduce<Record<string, number>>(
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

	const heatmap = Object.entries(grouped).map(([date, count]) => ({
		date,
		count,
	}))

	console.log(heatmap)

	res.json({
		monkeytype: {
			testsToday,
		},
		heatmap: heatmap,
	})
})

export default router
