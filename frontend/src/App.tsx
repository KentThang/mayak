import { useEffect, useState } from 'react'
import DashboardNavigation from './components/DashboardNavigation'
import ActivityView from './views/ActivityView'
import type { DashboardData } from './types/dashboard'
import { Route, Routes, useLocation } from 'react-router-dom'
import ListeningView from './views/ListeningView'
import { AnimatePresence, motion } from 'motion/react'
import SearchModal from './components/SearchModal'
import type { ActiveModal } from './types/modalTypes'
import CreateListeningExerciseModal from './components/CreateListeningExerciseModal'

function App() {
	const [dashboard, setDashboard] = useState<DashboardData | null>(null)
	const [activeModal, setActiveModal] = useState<ActiveModal>(null)
	const [initialLink, setInitialLink] = useState('')
	const [initialTitle, setInitialTitle] = useState('')
	const location = useLocation()

	const openCreateModal = (link = '', title = '') => {
		setInitialLink(link)
		setInitialTitle(title)
		setActiveModal('create-listening')
	}

	useEffect(() => {
		async function loadDashboard() {
			const response = await fetch('http://localhost:3000/api/dashboard')
			const data = await response.json()
			setDashboard(data)
		}

		loadDashboard()

		const handleKeyDown = (e: KeyboardEvent) => {
			if (e.key === 'Escape') {
				setActiveModal((current) =>
					current === null ? 'commandline' : null
				)
				return
			}

			if (
				/^\p{L}$/u.test(e.key) &&
				document.activeElement?.tagName !== 'INPUT'
			) {
				setActiveModal((current) =>
					current === null ? 'commandline' : current
				)
			}
		}

		window.addEventListener('keydown', handleKeyDown)

		return () => {
			window.removeEventListener('keydown', handleKeyDown)
		}
	}, [])

	return (
		<div className="app">
			<SearchModal
				show={activeModal === 'commandline'}
				onClose={() => setActiveModal(null)}
			/>
			<CreateListeningExerciseModal
				show={activeModal === 'create-listening'}
				initialLink={initialLink}
				initialTitle={initialTitle}
				onClose={() => setActiveModal(null)}
			/>

			<AnimatePresence mode="wait">
				<div className="dashboard min-h-screen flex flex-col pt-4 ps-10 pe-10 relative">
					<DashboardNavigation />
					<Routes location={location} key={location.pathname}>
						<Route
							path=""
							element={
								<motion.div
									initial={{ x: 15 }}
									animate={{ x: 0 }}
									exit={{ x: -15 }}
									transition={{ duration: 0.2 }}
								>
									<ActivityView dashboard={dashboard} />
								</motion.div>
							}
						/>
						<Route
							path="listening"
							element={
								<motion.div
									initial={{ x: 15 }}
									animate={{ x: 0 }}
									exit={{ x: -15 }}
									transition={{ duration: 0.2 }}
								>
									<ListeningView
										onOpenCreateModal={openCreateModal}
									/>
								</motion.div>
							}
						/>
					</Routes>
				</div>
			</AnimatePresence>
		</div>
	)
}

export default App
