import { useEffect, useState } from 'react'
import CalendarHeatmap from 'react-calendar-heatmap'

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
			console.log(data)
			setDashboard(data)
		}

		loadDashboard()
	}, [])

	return (
		<div className="app">
			<div className="sky" />
			<div className="ocean" />
			<div className="island">
				<div className="rock" />
				<div className="lighthouse">
					<div className="roof" />
					<div className="tower" />
				</div>
			</div>
			<div className="dashboard">
				<h1>mayak</h1>
				<div className="pt-1">
					<p className="text-xl">Activity Calendar</p>
					<div className="heatmap">
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
				</div>
				<p>
					monkeytype tests today: {dashboard?.monkeytype.testsToday}
				</p>
			</div>
		</div>
	)
}

export default App
