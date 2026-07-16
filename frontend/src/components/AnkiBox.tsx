function AnkiBox() {
	return (
		<div className="w-fit mt-2">
			<p className="text-3xl m-0 pb-2">Anki</p>
			<div className="flex flex-row rounded-lg border px-3 py-3">
				<div className="flex flex-col align-center">
					<b>Cards added today</b>
					<h1 className="circled-number mx-auto mt-1 border w-15 h-15 rounded-full flex items-center justify-center font-semibold tabular-nums">
						0
					</h1>
				</div>
				<div className="ps-3">
					<b>Today</b>
					<p>Cards reviewed: </p>
					<p>Cards due: </p>
					<p>Total cards: </p>
				</div>
			</div>
		</div>
	)
}

export default AnkiBox
