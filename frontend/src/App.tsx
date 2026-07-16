import { useEffect, useState } from 'react'
import SearchModal from './components/SearchModal'
import MonkeytypeBox from './components/MonkeytypeBox'
import Heatmap from './components/Heatmap'
import AnkiBox from './components/AnkiBox'

interface DashboardData {
	monkeytype: {
		testsToday: number
	}
	heatmap: {
		date: string
		count: number
		monkeytype: number
	}[]
	latest: {
		wpm: number
		characters: number
		accuracy: number
	}
	bestTest: {
		wpm: number
		characters: number
		accuracy: number
	}
}

function App() {
	const [dashboard, setDashboard] = useState<DashboardData | null>(null)

	useEffect(() => {
		async function loadDashboard() {
			const response = await fetch('http://localhost:3000/api/dashboard')
			const data = await response.json()
			setDashboard(data)
		}

		loadDashboard()
	}, [])

	return (
		<div className="app">
			<div className="dashboard min-h-screen flex flex-col pt-4 ps-10 pe-10 relative">
				<div
					id="header"
					className="relative flex flex-row items-center justify-between w-100 text-center"
				>
					<h1>mayak</h1>
					<div className="backdrop-blur-lg absolute left-1/2 -translate-x-1/2 rounded-2xl py-1 px-2">
						<p>
							type any letter or press
							<kbd className="rounded-md border px-1 py-0 mx-1 bg-transparent">
								escape
							</kbd>
							to open command line
						</p>
					</div>
					<SearchModal />
				</div>
				<div className="pt-1 flex justify-center gap-2">
					<div
						id="main-panel"
						className="main-panel w-7xl px-9 pb-2 pt-2 rounded-4xl backdrop-blur-lg"
					>
						<p className="text-3xl pb-2 m-0">Activity Calendar</p>
						<Heatmap heatmap={dashboard?.heatmap} />
						<div className="flex flex-row gap-3">
							<MonkeytypeBox
								testsToday={dashboard?.monkeytype.testsToday}
								latest={dashboard?.latest}
								bestTest={dashboard?.bestTest}
							/>
							<AnkiBox />
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
