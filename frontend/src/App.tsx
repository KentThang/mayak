import { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'
import Searchbar from './components/Searchbar'

interface DashboardData {
	monkeytype: {
		testsToday: number
	}
	heatmap: {
		date: string
		count: number
	}[]
}

const today = new Date()
const oneYearAgo = new Date()
oneYearAgo.setFullYear(today.getFullYear() - 1)

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
					<Searchbar />
				</div>
				<div className="pt-1 flex justify-center gap-2">
					<div
						id="main-panel"
						className="main-panel w-7xl px-9 pb-2 pt-2 rounded-4xl backdrop-blur-lg"
					>
						<p className="text-3xl pb-2">Activity Calendar</p>
						<div className="heatmap rounded-3xl">
							<CalendarHeatmap
								startDate={oneYearAgo}
								endDate={today}
								values={dashboard?.heatmap ?? []}
								classForValue={(value) => {
									if (!value) {
										return 'color-empty'
									} else if (value.count > 0) {
										return `color-github-1`
									} else if (value.count > 10) {
										return `color-github-2`
									} else if (value.count > 20) {
										return `color-github-3`
									} else if (value.count > 30) {
										return `color-github-4`
									} else return `color-github-5`
								}}
							/>
						</div>
						<p className="pt-3">
							monkeytype tests today:{' '}
							{dashboard?.monkeytype.testsToday}
						</p>
					</div>
				</div>
			</div>
		</div>
	)
}

export default App
