import { useEffect, useState } from 'react'
import DashboardNavigation from './components/DashboardNavigation'
import ActivityView from './views/ActivityView'
import type { DashboardData } from './types/dashboard'
import { Route, Routes } from 'react-router-dom'

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
				<DashboardNavigation />
				<Routes>
					<Route
						path=""
						element={<ActivityView dashboard={dashboard} />}
					/>
				</Routes>
			</div>
		</div>
	)
}

export default App
