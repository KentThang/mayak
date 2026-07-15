import { getMonkeytypeResults } from '../services/monkeytype.ts'
import { saveMonkeytypeResults } from '../repositories/monkeytypeRepository.ts'
import type { MonkeytypeResult } from '../generated/prisma/client.ts'

export async function syncMonkeytype(latestTimestamp: bigint) {
	let results: MonkeytypeResult[] = []
	try {
		results = await getMonkeytypeResults(latestTimestamp)
	} catch (error) {
		// Abort sync attempt if fetch failed
		return
	}

	const newResults = latestTimestamp
		? results.filter((r) => r.timestamp > latestTimestamp)
		: results

	// If there are new results, save them to DB
	if (newResults.length != 0) await saveMonkeytypeResults(newResults)
}
