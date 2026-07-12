import type { MonkeytypeResult } from '../generated/prisma/client.ts'

export interface MonkeytypeApiResult {
	_id: string
	timestamp: number
	wpm: number
	acc: number
}

const apiKey = process.env.MONKEYTYPE_APEKEY

export async function getMonkeytypeResults(
	afterTimestamp?: bigint
): Promise<MonkeytypeResult[]> {
	const url = new URL('https://api.monkeytype.com/results')
	url.searchParams.set('limit', '100')

	if (afterTimestamp) {
		url.searchParams.set('onOrAfterTimestamp', afterTimestamp.toString())
	}

	const response = await fetch(url, {
		headers: {
			Authorization: `ApeKey ${apiKey}`,
		},
	})

	if (!response.ok) {
		throw new Error(`Monkeytype API error: ${response.status}`)
	}

	const json = await response.json()
	return json.data.map((result: MonkeytypeApiResult) => ({
		id: result._id,
		timestamp: BigInt(result.timestamp),
		wpm: result.wpm,
		accuracy: result.acc,
	}))
}
