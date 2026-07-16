type MonkeytypeBoxProps = {
	testsToday?: number
	latest?: {
		wpm: number
		characters: number
		accuracy: number
	}
	bestTest?: {
		wpm: number
		characters: number
		accuracy: number
	}
}

function MonkeytypeBox({ testsToday, bestTest, latest }: MonkeytypeBoxProps) {
	return (
		<div className="w-fit mt-2">
			<p className="text-3xl m-0 pb-2">Monkeytype</p>
			<div className="flex flex-row rounded-lg border px-3 py-3">
				<div className="flex flex-col align-center">
					<b>Tests today</b>
					<h1 className="circled-number mx-auto mt-1 border w-15 h-15 rounded-full flex items-center justify-center text-xl font-semibold tabular-nums">
						{testsToday ?? 0}
					</h1>
				</div>
				<div className="ps-3">
					<b>Latest Result</b>
					<p>WPM: {latest?.wpm ?? '-'}</p>
					<p>Characters: {latest?.characters ?? '-'}</p>
					<p>Accuracy: {latest?.accuracy ?? '-'}%</p>
				</div>
				<div className="ps-3">
					<b>👑 Personal Best (WPM)</b>
					<p>WPM: {bestTest?.wpm ?? '-'}</p>
					<p>Characters: {bestTest?.characters ?? '-'}</p>
					<p>Accuracy: {bestTest?.accuracy ?? '-'}%</p>
				</div>
			</div>
		</div>
	)
}

export default MonkeytypeBox
