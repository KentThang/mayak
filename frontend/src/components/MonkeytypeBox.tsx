type MonkeytypeBoxProps = {
	testsToday?: number
}

function MonkeytypeBox({ testsToday }: MonkeytypeBoxProps) {
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
					<p>WPM: </p>
					<p>Characters: </p>
					<p>Accuracy: </p>
				</div>
				<div className="ps-3 pt-1 mt-2">
					<p>Personal Best</p>
					<p>Record WPM: </p>
					<p>Record Characters: </p>
					<p>Latest Test: </p>
				</div>
			</div>
		</div>
	)
}

export default MonkeytypeBox
