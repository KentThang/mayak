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
		<div className="w-fit mt-3">
			<p className="text-3xl m-0 pb-2">Monkeytype</p>
			<div className="flex flex-row rounded-lg border px-3">
				<div className="pt-1 mt-2 flex flex-col align-center">
					<p>Tests today</p>
					<h1 className="ms-3 border w-12 h-12 rounded-full flex items-center justify-center text-xl font-semibold tabular-nums">
						{testsToday ?? 0}
					</h1>
				</div>
				<div className="ps-3 pt-1 mt-2">
					<p>Latest Result</p>
					<p>WPM: {latest?.wpm ?? '-'}</p>
					<p>Characters: {latest?.characters ?? '-'}</p>
					<p>Accuracy: {latest?.accuracy ?? '-'}%</p>
				</div>
				<div className="ps-3 pt-1 mt-2">
					<p>👑 Personal Best (WPM)</p>
					<p>WPM: {bestTest?.wpm ?? '-'}</p>
					<p>Characters: {bestTest?.characters ?? '-'}</p>
					<p>Accuracy: {bestTest?.accuracy ?? '-'}%</p>
				</div>
			</div>
		</div>
	)
}

export default MonkeytypeBox
