export interface DashboardData {
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
