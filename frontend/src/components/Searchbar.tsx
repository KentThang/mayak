import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { executeSearch } from '../utils/SearchbarUtils'
import DictionaryResultBox from './DictionaryResultBox'
import type { DictionaryResult } from '../types/dictionary'

function Searchbar() {
	const [result, setResult] = useState<DictionaryResult | null>(null)
	const [resultMessage, setResultMessage] = useState<string>(null)
	const [show, setShow] = useState(false)
	const [query, setQuery] = useState('')

	const handleSearch = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		const data = await executeSearch(query)

		if (data) {
			if (data.def.length != 0) {
				setResult(data)
				setResultMessage(null)
			} else {
				setResult(null)
				setResultMessage("No result found for '" + query + "'")
			}
			return
		}

		handleClose()
	}

	useEffect(() => {
		const handleKeyDown = (e: { key: string }) => {
			if (e.key === 'Escape') {
				setShow((prev) => !prev)
				setQuery('')
				setResult(null)
				setResultMessage(null)
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
		setResult(null)
		setResultMessage(null)
	}

	return (
		<>
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
					<div
						className={`results-container ${result || resultMessage ? 'show' : ''}`}
					>
						{result && <DictionaryResultBox result={result} />}
						{resultMessage && (
							<div>
								<hr />
								<p className="m-0">{resultMessage}</p>
							</div>
						)}
					</div>
				</Modal.Body>
			</Modal>
		</>
	)
}

export default Searchbar
