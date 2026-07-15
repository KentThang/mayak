import { useEffect, useState } from 'react'
import SearchModal from './components/SearchModal'
import MonkeytypeBox from './components/MonkeytypeBox'
import Heatmap from './components/Heatmap'

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
			<div className="dashboard min-h-screen flex flex-col pt-5 ps-10 pe-10 relative">
				<div id="header" className="flex flex-row gap-5">
					<h1>mayak</h1>
					<SearchModal />
				</div>
				<div className="pt-1 flex justify-center gap-2">
					<div
						id="main-panel"
						className="main-panel w-7xl px-9 pb-2 pt-2 rounded-4xl backdrop-blur-lg"
					>
						<p className="text-3xl pb-2 m-0">Activity Calendar</p>
						<Heatmap heatmap={dashboard?.heatmap} />
						<MonkeytypeBox
							testsToday={dashboard?.monkeytype.testsToday}
							latest={dashboard?.latest}
							bestTest={dashboard?.bestTest}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
