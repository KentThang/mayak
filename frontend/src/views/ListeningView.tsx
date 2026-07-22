import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { isValidHttpUrl } from '../utils/ListeningViewUtils'

interface ListeningViewProps {
	onOpenCreateModal: (link?: string, title?: string) => void
}

function ListeningView({ onOpenCreateModal }: ListeningViewProps) {
	const [input, setInput] = useState('')

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		// IDEA: add exercise to DB
		// i was thinking about a way to do this without a modal but I think its just best to do it with a modal
		// enter link / title in search input
		// open modal and sets link to input (can also be title?)
		if (isValidHttpUrl(input)) {
			onOpenCreateModal(input, undefined)
		} else onOpenCreateModal(undefined, input)

		// exercises gets stored in DB from modal
		// after creating exercise in modal, update list of exercises and open the first one / latest trained one?
		// fetch title, url, timestamp from db
		// display title, url, timestamp in frontend
	}

	return (
		<div className="pt-1 flex justify-center gap-2">
			<div
				id="main-panel"
				className="main-panel w-7xl px-9 pb-2 pt-2 rounded-4xl backdrop-blur-lg"
			>
				<p className="text-3xl pb-2 m-0">Listening</p>
				<div className="flex flex-row">
					<div
						id="listening-exercises-list"
						className="flex flex-col w-25"
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
						<div id="list-container">
							{/* Loop through list of exercises saved */}
						</div>
					</div>
					<div>
						<h2>Title</h2>
						<p>Listens: X</p>
						<div id="past-listens-list" className="">
							{/* Loop through list of listens saved */}
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default ListeningView
