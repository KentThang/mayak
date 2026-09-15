export async function saveActivity(activityTitle: string, secondsSpent: number) {
	const response = await fetch(
		'http://localhost:3000/api/activity/save-activity',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				activityTitle,
				secondsSpent,
			})
		}
	)

	if (!response.ok) {
		throw new Error('Failed to save activity')
	}

	return await response.json()
}
