import { useEffect, useRef, useState, type Dispatch, type SetStateAction } from "react"
import { saveActivity } from "../utils/ActivityBoxUtils";

type ActivityBoxProps = {
	setToastOpen: Dispatch<SetStateAction<boolean>>
	setToastMessage: Dispatch<SetStateAction<String>>
}

function ActivityBox({ setToastOpen, setToastMessage }: ActivityBoxProps) {
	const [duration, setDuration] = useState('10:00') // TODO: consider storing timer duration as minutes & seconds instead of string
	const [initialDuration, setInitialDuration] = useState('');
	const [activeMode, setActiveMode] = useState('timer')
	const [timerStarted, setTimerStarted] = useState(false)
	const [timerPaused, setTimerPaused] = useState(false)
	const [activityTitle, setActivityTitle] = useState('')
	const [titleError, setTitleError] = useState(0)

	const timerInputRef = useRef<HTMLInputElement>(null)
	const titleInputRef = useRef<HTMLInputElement>(null)

	function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
		const value = e.target.value

		if (/^\d{0,4}(:\d{0,2})?$/.test(value)) {
			setDuration(value)
		}
	}

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		timerInputRef.current?.blur()

		formatTimerInput()
	}

	function handleMainButtonPressed() {
		if (!timerStarted) {
			setTimerStarted(true)
			if (activeMode == "timer")
				setInitialDuration(duration);
		}
		else if (timerStarted)
			setTimerPaused(prev => !prev)
	}

	function handleLeftButtonPressed() {
		if (!timerStarted && activeMode != "timer") {
			setActiveMode("timer")
			setDuration(initialDuration)
		}
		else
			resetTimer()
	}

	function resetTimer() {
		setTimerStarted(false)
		setTimerPaused(false)
		setActivityTitle('')

		if (activeMode == "timer")
			setDuration(initialDuration);
		else
			setDuration("00:00")
	}

	async function handleRightButtonPressed() {
		if (!timerStarted && activeMode != "stopwatch") {
			setActiveMode("stopwatch")
			setInitialDuration(duration)
			setDuration("00:00")
		}
		else {
			setTimerPaused(true)

			// Require title
			if (!activityTitle.trim()) {
				setTitleError(prev => prev + 1)
				return
			}

			// Calculate duration
			const [elapsedMinutes, elapsedSeconds] = duration.split(':').map(Number)
			const totalSeconds = elapsedMinutes * 60 + elapsedSeconds

			let result
			if (activeMode == "timer") {
				const [initialMinutes, initialSeconds] = initialDuration.split(':').map(Number)
				const initialTotalSeconds = initialMinutes * 60 + initialSeconds

				const secondsSpent = initialTotalSeconds - totalSeconds // Save amount of seconds to DB and then format in frontend?

				result = await saveActivity(activityTitle, secondsSpent)
			}
			else
				result = await saveActivity(activityTitle, totalSeconds)

			setToastOpen(true)
			setToastMessage(result.message)
			resetTimer()
		}
	}

	// Ticking mechanic
	useEffect(() => {
		if (!timerStarted || timerPaused ) return

		const interval = setInterval(() => {
			setDuration(prev => {
				const [minutes, seconds] = prev.split(':').map(Number)
				const totalSeconds = minutes * 60 + seconds

				if (activeMode === "stopwatch") {
					const elapsed = totalSeconds + 1
					const newMinutes = Math.floor(elapsed / 60)
					const newSeconds = elapsed % 60

					return `${newMinutes}:${newSeconds.toString().padStart(2, '0')}`
				}

				if (totalSeconds <= 0) {
					// Pause timer to allow user have the opportunity to save to DB
					setTimerPaused(true)
					return "00:00"
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

	// Wonky
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

	// Crazy HTML, not sure if all these conditional HTML can be simplified somehow
	return (
		<div className="w-fit mt-2">
			<p className="text-3xl m-0 pb-2">Activity</p>
			<div className="flex flex-row rounded-lg border px-3 py-3">
				<div className="flex flex-col align-center justify-center items-center">
					<form onSubmit={(e) => {e.preventDefault(); titleInputRef.current?.blur()}}>
						<input key={titleError} ref={titleInputRef} className={`appearance-none text-center text-white font-semibold ${titleError > 0 ? "animate-shake" : ""}`} placeholder="enter activity title" value={activityTitle} onChange={e => {setActivityTitle(e.target.value)}}></input>
					</form>
					<div className="flex flex-row items-center gap-4">
						<div className={`border p-2 hoverable-anim clickable-rounded ${!timerStarted && activeMode == "timer" ? "bg-orange-400" : ""}`} onClick={() => handleLeftButtonPressed()}>
							{timerStarted ? (<i className="fa-solid fa-rotate-left" style={{ color: 'rgb(255, 255, 255)' }} />) : (<i className="fa-solid fa-hourglass" style={{ color: 'rgb(255, 255, 255)' }} />)}
						</div>
						<h1 className="mx-auto mt-1 border w-15 h-15 font-semibold tabular-nums hoverable-anim clickable-rounded" onClick={() => handleMainButtonPressed()}>
							{(timerStarted && !timerPaused) ? (<i key="pause" className="fa-solid fa-pause" style={{ color: 'rgb(255, 255, 255)' }} />)
							: (<i key="play" className="fa-solid fa-play" style={{ color: 'rgb(255, 255, 255)' }} />)}
						</h1>
						<div className={`border p-2 hoverable-anim clickable-rounded ${!timerStarted && activeMode == "stopwatch" ? "bg-orange-400" : ""}`} onClick={() => handleRightButtonPressed()}>
							{timerStarted ? (<i className="fa-solid fa-floppy-disk" style={{ color: 'rgb(255, 255, 255)' }} />) : (<i className="fa-solid fa-stopwatch" style={{ color: 'rgb(255, 255, 255)' }} />)}
						</div>
					</div>
						{timerStarted ? (<b>{duration}</b>) :
						(<div className="flex flex-row justify-center gap-3">
							<div className={`px-2 hoverable-anim clickable-rounded ${activeMode == "stopwatch" ? "invisible" : ""}`}>
								<b onClick={() => changeMinutes(-1)} className="select-none">-</b>
							</div>
							{activeMode == "timer" ?
							(<form onSubmit={handleSubmit}>
								<input ref={timerInputRef} inputMode="numeric" className="text-center w-20 text-white font-semibold" placeholder="00:00" value={duration}
								onChange={handleChange} onBlur={formatTimerInput}>
								</input>
							</form>) :
							(<b>{duration}</b>)}
							<div className={`px-2 hoverable-anim clickable-rounded ${activeMode == "stopwatch" ? "invisible" : ""}`}>
								<b onClick={() => changeMinutes(1)} className="select-none">+</b>
							</div>
						</div>)}
				</div>
			</div>
		</div>
	)
}

export default ActivityBox
