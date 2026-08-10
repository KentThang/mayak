import { useEffect, useState } from 'react'
import { Button } from 'react-bootstrap'
import { fetchExercises, fetchPastListens, isValidHttpUrl } from '../utils/ListeningViewUtils'
import type { Listen, ListeningExercise } from '../types/listeningView'

interface ListeningViewProps {
	onOpenCreateModal: (link?: string, title?: string) => void
}

function ListeningView({ onOpenCreateModal }: ListeningViewProps) {
	const [input, setInput] = useState('')
	const [exercises, setExercises] = useState<ListeningExercise[] | null>(null)
	const [selectedExercise, setSelectedExercise] = useState<ListeningExercise | null>(null)
	const [pastListens, setPastListens] = useState<Listen[] | null>(null)

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		if (isValidHttpUrl(input)) {
			onOpenCreateModal(input, undefined)
		} else onOpenCreateModal(undefined, input)

		// TODO: after creating exercise in modal, update list of exercises and open the first one / latest trained one?
	}

	async function loadExercises() {
		const data = await fetchExercises()
		setExercises(data)
	}

	async function loadPastListens(exerciseId: string) {
		const data = await fetchPastListens(exerciseId)
		if (data && selectedExercise)
			setPastListens(data)
	}

	useEffect(() => {
		loadExercises()
	}, [])

	useEffect(() => {
		if (selectedExercise) {
			loadPastListens(selectedExercise.id)
		}
	}, [selectedExercise])

	return (
		<div className="pt-1 flex justify-center gap-2">
			<div
				id="main-panel"
				className="main-panel w-7xl px-9 pb-2 pt-2 rounded-4xl backdrop-blur-lg"
			>
				<p className="text-3xl pb-2 m-0">Listening</p>
				<div className="flex flex-row gap-3">
					<div
						id="listening-exercises-container"
						className="flex flex-col basis-1/3 min-w-0"
					>
						<div className="flex flex-row">
							<form className="w-100" onSubmit={handleSubmit}>
								<input
									className="listening-input bg-white p-1 rounded-xl w-100"
									placeholder="Search or add a listening exercise..."
									value={input}
									onChange={(e) => setInput(e.target.value)}
								></input>
							</form>
							<Button
								variant="success"
								onClick={() => onOpenCreateModal(input)}
							>
								+
							</Button>
						</div>
						<div id="exercises-list" className="border rounded-lg p-1 mt-1 max-h-96 overflow-y-auto">
							{/* Loop through list of exercises saved */}
							{exercises?.map((exercise) => (
								<div key={exercise.id} className="border rounded-lg cursor-pointer mb-1" onClick={() => { setSelectedExercise(exercise) }}>
									<p>{exercise.title}</p>
								</div>
							))}
						</div>
					</div>
					<div id="selected-exercise-container" className="selected-exercise-container border rounded-lg basis-2/3 min-w-0">
						{selectedExercise === null ? (
							<h3>Exercise not selected</h3>
						) :
							(
								<div className="w-fit ps-2">
									{selectedExercise.url === null ? (
										<h3>{selectedExercise?.title}</h3>
									) :
										(
											<a href={selectedExercise.url}>
												<h3>{selectedExercise?.title}</h3>
											</a>
										)}
									<p>Listens: {pastListens?.length ?? 0}</p>
									<div id="past-listens-list" className="">
										{/* Loop through list of listens saved */}
										{pastListens?.map((listen) => (
											<div key={listen.id} className="border rounded p-1 mb-1">
												<p>{listen.notesDuring}</p>
											</div>
										))}
									</div>
								</div>
							)
						}
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListeningView
