export async function createListeningExercise(title: string, link: string) {
	const response = await fetch(
		'http://localhost:3000/api/listening/save-exercise',
		{
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				title,
				link,
			}),
		}
	)

	if (!response.ok) {
		throw new Error('Failed to create listening exercise')
	}

	return await response.json()
}
