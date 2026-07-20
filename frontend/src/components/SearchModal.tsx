import { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { executeSearch } from '../utils/SearchModalUtils'
import DictionaryResultBox from './DictionaryResultBox'
import type { DictionaryResult } from '../types/dictionary'
import { useNavigate } from 'react-router-dom'

interface SearchModalProps {
	show: boolean
	onClose: () => void
}

function SearchModal({ show, onClose }: SearchModalProps) {
	const [result, setResult] = useState<DictionaryResult | null>(null)
	const [resultMessage, setResultMessage] = useState<string>('')
	const [query, setQuery] = useState('')

	const navigate = useNavigate()

	const handleSearch = async (e: { preventDefault: () => void }) => {
		e.preventDefault()

		const data = await executeSearch(query, navigate)

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
		if (!show) {
			setQuery('')
			setResult(null)
			setResultMessage('')
		}
	}, [show])

	const handleClose = () => {
		setQuery('')
		setResult(null)
		setResultMessage('')
		onClose()
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
