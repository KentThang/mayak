import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { executeSearch } from '../utils/SearchModalUtils'
import DictionaryResultBox from './DictionaryResultBox'
import type { DictionaryResult } from '../types/dictionary'

function SearchModal() {
	const [result, setResult] = useState<DictionaryResult | null>(null)
	const [resultMessage, setResultMessage] = useState<string>('')
	const [show, setShow] = useState(false)
	const [query, setQuery] = useState('')

	const handleSearch = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		const data = await executeSearch(query)

		if (data) {
			if (data.def.length != 0) {
				setResult(data)
				setResultMessage('')
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
				setResultMessage('')
			}
			// Regex that accepts stringы consisting of only one Unicode letter
			else if (/^\p{L}$/u.test(e.key)) {
				setShow(true)
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
		setResultMessage('')
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

export default SearchModal
