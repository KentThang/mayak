import { Tooltip } from 'react-tooltip'
import '../Heatmap.css'
import CalendarHeatmap from 'react-calendar-heatmap'

type HeatmapProps = {
	heatmap?: {
		date: string
		count: number
		monkeytype: number
	}[]
}

const today = new Date()
const oneYearAgo = new Date()
oneYearAgo.setFullYear(today.getFullYear() - 1)

function Heatmap({ heatmap }: HeatmapProps) {
	return (
		<div className="heatmap rounded-3xl border p-3">
			<CalendarHeatmap
				startDate={oneYearAgo}
				endDate={today}
				values={heatmap ?? []}
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
				tooltipDataAttrs={(value) =>
					({
						'data-tooltip-id': 'heatmap-tooltip',
						'data-tooltip-content':
							value?.monkeytype != null
								? `${value.monkeytype} Monkeytype tests on ${value.date}`
								: 'No tests',
					}) as any
				}
			/>
			<Tooltip id="heatmap-tooltip" />
		</div>
	)
}

export default Heatmap
