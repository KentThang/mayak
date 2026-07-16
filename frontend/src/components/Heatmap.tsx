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
	const maxCount = Math.max(...(heatmap ?? []).map((value) => value.count), 0)

	const getColorClass = (count: number) => {
		if (count === 0 || maxCount === 0) {
			return 'color-empty'
		}

		const level = Math.ceil((count / maxCount) * 4)

		return `color-github-${Math.min(level, 4)}`
	}

	return (
		<div className="heatmap rounded-3xl border p-3">
			<CalendarHeatmap
				startDate={oneYearAgo}
				endDate={today}
				values={heatmap ?? []}
				classForValue={(value) => {
					if (!value) {
						return 'color-empty'
					}

					return getColorClass(value.count)
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
