import { getMonkeytypeResults } from '../services/monkeytype.ts'
import {
	getLatestMonkeytypeResult,
	saveMonkeytypeResults,
} from '../repositories/monkeytypeRepository.ts'
import type { MonkeytypeResult } from '../generated/prisma/client.ts'

export async function syncMonkeytype() {
	let latest: MonkeytypeResult | null = null
	try {
		latest = await getLatestMonkeytypeResult()
	} catch (error) {
		// do nothing, DB empty
	}

	let results: MonkeytypeResult[] = []
	try {
		results = await getMonkeytypeResults(latest?.timestamp)
	} catch (error) {
		// Abort sync attempt if fetch failed
		return
	}

	const newResults = latest
		? results.filter((r) => r.timestamp > latest.timestamp)
		: results

	// If there are new results, save them to DB
	if (newResults.length != 0) await saveMonkeytypeResults(newResults)
}
