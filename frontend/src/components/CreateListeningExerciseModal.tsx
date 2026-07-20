import { useEffect, useState } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'

type CreateListeningExerciseModalProps = {
	show: boolean
	initialLink: string
	initialTitle: string
	onClose: () => void
}

// TODO: implement add listening exercise, frontend, handle the two modals clashing
function CreateListeningExerciseModal({
	show,
	initialLink,
	initialTitle,
	onClose,
}: CreateListeningExerciseModalProps) {
	const [link, setLink] = useState('')
	const [title, setTitle] = useState('')

	const handleSubmit = async (e: { preventDefault: () => void }) => {
		e.preventDefault()
	}

	useEffect(() => {
		if (show) {
			setLink(initialLink)
			setTitle(initialTitle)
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
				<Modal.Body>
					<form onSubmit={handleSubmit}>
						<input
							autoFocus
							className="w-100 focus:outline-none"
							placeholder="Link"
							value={link}
							onChange={(e) => setLink(e.target.value)}
						/>
						<input
							className="w-100 focus:outline-none"
							placeholder="Title"
							value={title}
							onChange={(e) => setTitle(e.target.value)}
						/>
						<Button type="submit">Create</Button>
					</form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default CreateListeningExerciseModal
