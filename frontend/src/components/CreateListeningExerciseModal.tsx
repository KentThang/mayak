import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import { lookupTitle } from '../utils/ListeningViewUtils'

type CreateListeningExerciseModalProps = {
	show: boolean
	initialLink: string
	initialTitle: string
	onClose: () => void
}

// TODO: implement add listening exercise, frontend
function CreateListeningExerciseModal({
	show,
	initialLink,
	initialTitle,
	onClose,
}: CreateListeningExerciseModalProps) {
	const [link, setLink] = useState('')
	const [title, setTitle] = useState('')
	const [loadingTitle, setLoadingTitle] = useState(false)

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		// store title, url, timestamp in db
		// also store # listens (default 0)
	}

	useEffect(() => {
		if (!show) return

		setLink(initialLink)
		setTitle(initialTitle)

		if (!initialTitle) setLoadingTitle(true)

		if (initialLink) {
			lookupTitle(initialLink)
				.then(setTitle)
				.finally(() => {
					setLoadingTitle(false)
				})
		}
	}, [show, initialLink, initialTitle])

	return (
		<>
			<Modal
				className="border-radius-lg"
				show={show}
				onHide={onClose}
				keyboard={false} // To disable conflict with handleKeyDown
			>
				<Modal.Header className="pb-1">
					<h4>Create Listening Exercise</h4>
				</Modal.Header>
				<Modal.Body className="pt-1">
					<p className="my-1 text-black">
						Enter a link and a title to create a listening exercise.
					</p>
					<form onSubmit={handleSubmit}>
						<div className="flex flex-row gap-2">
							Link:
							<input
								className="w-100"
								placeholder="Enter Link..."
								value={link}
								onChange={(e) => setLink(e.target.value)}
							/>
						</div>
						<div className="flex flex-row gap-2">
							Title:
							<input
								className="w-100"
								placeholder={
									loadingTitle
										? 'Loading...'
										: 'Enter Title...'
								}
								value={title}
								required
								onChange={(e) => setTitle(e.target.value)}
							/>
						</div>
						<Button type="submit" autoFocus className="mt-1">
							Create
						</Button>
					</form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default CreateListeningExerciseModal
