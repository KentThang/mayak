import AnkiBox from '../components/AnkiBox'
import Heatmap from '../components/Heatmap'
import MonkeytypeBox from '../components/MonkeytypeBox'
import type { DashboardData } from '../types/dashboard'

type ActivityViewProps = {
	dashboard: DashboardData | null
}

function ActivityView({ dashboard }: ActivityViewProps) {
	return (
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
	)
}

export default ActivityView
