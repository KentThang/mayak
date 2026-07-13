import { useState, useEffect } from 'react'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { executeSearch } from '../utils/SearchbarUtils'

function Searchbar() {
	const [show, setShow] = useState(false)
	const [query, setQuery] = useState('')

	const handleSearch = (e) => {
		e.preventDefault()

		executeSearch(query)

		setShow(false)
		setQuery('')
	}

	useEffect(() => {
		const handleKeyDown = (e) => {
			if (e.key === 'Escape') {
				setShow((prev) => !prev)
				setQuery('')
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	const handleClose = () => {
		setShow(false)
		setQuery('')
	}
	const handleShow = () => {
		setShow(true)
		setQuery('')
	}

	return (
		<>
			<Button variant="outline-light" onClick={handleShow}>
				search
			</Button>

			<Modal
				className="border-radius-lg"
				show={show}
				onHide={handleClose}
				keyboard={false} // To disable conflict with handleKeyDown
			>
				<Modal.Body>
					{/* <FontAwesomeIcon icon={byPrefixAndName.fas['magnifying-glass']} style={{color: "rgb(0, 0, 0)",}} /> */}
					<form onSubmit={handleSearch}>
						<input
							autoFocus
							className="w-100 focus:outline-none"
							placeholder="Search..."
							value={query}
							onChange={(e) => setQuery(e.target.value)}
						/>
					</form>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Searchbar
