import { useEffect, useRef, useState } from "react"

function ActivityBox() {
	const [duration, setDuration] = useState('10:00') // TODO: consider storing timer duration as minutes & seconds instead of string
	const [initialDuration, setInitialDuration] = useState('');
	const [activeMode, setActiveMode] = useState('timer')
	const [timerStarted, setTimerStarted] = useState(false)
	const [timerPaused, setTimerPaused] = useState(false)
	const inputRef = useRef<HTMLInputElement>(null)

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value

		if (/^\d{0,4}(:\d{0,2})?$/.test(value)) {
			setDuration(value)
		}
	}

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		inputRef.current?.blur()

		formatTimerInput()
	}

	function handleMainButtonPressed() {
		if (!timerStarted) {
			setTimerStarted(true)
			setInitialDuration(duration);
		}
		else if (timerStarted)
			setTimerPaused(prev => !prev)
	}

	function handleRightButtonPressed() {
		if (!timerStarted)
			setActiveMode("stopwatch")
		else {
			setTimerStarted(false)
			setTimerPaused(false)
			setDuration(initialDuration);
		}
	}

	useEffect(() => {
		if (!timerStarted || timerPaused ) return

		const interval = setInterval(() => {
			setDuration(prev => {
				const [minutes, seconds] = prev.split(':').map(Number)
				const totalSeconds = minutes * 60 + seconds

				if (totalSeconds <= 0) {
					setTimerStarted(false)
					return '0:00'
				}

				const remaining = totalSeconds - 1
				const newMinutes = Math.floor(remaining / 60)
				const newSeconds = remaining % 60

				return `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`
			})
		}, 1000)

		return () => clearInterval(interval)
	}, [timerStarted, timerPaused])

	/**
	 * Formats the timer input to include a ':' sign if not already included.
	 */
	function formatTimerInput() {
		if (!duration) return

		const digits = duration.replace(/\D/g, '')

		if (digits.length <= 2) {
			setDuration(`${digits}:00`)
			return
		}

		const minutes = digits.slice(0, -2)
		const seconds = digits.slice(-2)

		setDuration(`${minutes}:${seconds}`)
	}

	function changeMinutes(amount: number) {
		const [minutes = 0, seconds = 0] = duration
			.split(':')
			.map(Number)

		const totalSeconds = Math.max(
			0,
			(minutes || 0) * 60 + (seconds || 0) + amount * 60
		)

		const newMinutes = Math.floor(totalSeconds / 60)
		const newSeconds = totalSeconds % 60

		setDuration(
			`${newMinutes}:${newSeconds.toString().padStart(2, '0')}`
		)
	}

	// Crazy HTML
	return (
		<div className="w-fit mt-2">
			<p className="text-3xl m-0 pb-2">Activity</p>
			<div className="flex flex-row rounded-lg border px-3 py-3">
				<div className="flex flex-col align-center justify-center items-center">
					{/* <input className="text-center text-white font-semibold" placeholder="enter activity title"></input> */}
					<div className="flex flex-row items-center gap-4">
						<div className={`border p-2 hoverable-anim clickable-rounded ${timerStarted ? "invisible" : ""}`} onClick={() => setActiveMode("timer")}>
							<i className="fa-solid fa-hourglass" style={{ color: 'rgb(255, 255, 255)' }} />
						</div>
						<h1 className="mx-auto mt-1 border w-15 h-15 font-semibold tabular-nums hoverable-anim clickable-rounded" onClick={() => handleMainButtonPressed()}>
							{(timerStarted && !timerPaused) ? (<i key="pause" className="fa-solid fa-pause" style={{ color: 'rgb(255, 255, 255)' }} />)
							: (<i key="play" className="fa-solid fa-play" style={{ color: 'rgb(255, 255, 255)' }} />)}
						</h1>
						<div className="border p-2 hoverable-anim clickable-rounded" onClick={() => handleRightButtonPressed()}>
							{timerStarted ? (<i className="fa-solid fa-rotate-left" style={{ color: 'rgb(255, 255, 255)' }} />) : (<i className="fa-solid fa-stopwatch" style={{ color: 'rgb(255, 255, 255)' }} />)}
						</div>
					</div>
						{timerStarted ? (<b>{duration}</b>) :
						(<div className="flex flex-row justify-center gap-3">
							<div className="px-2 hoverable-anim clickable-rounded">
								<b onClick={() => changeMinutes(-1)} className="select-none">-</b>
							</div>
							<form onSubmit={handleSubmit}>
								<input ref={inputRef} inputMode="numeric" className="text-center w-20 text-white font-semibold" placeholder="00:00" value={duration}
								onChange={handleChange} onBlur={formatTimerInput}>
								</input>
							</form>
							<div className="px-2 hoverable-anim clickable-rounded">
								<b onClick={() => changeMinutes(1)} className="select-none">+</b>
							</div>
						</div>)}
				</div>
			</div>
		</div>
	)
}

export default ActivityBox
