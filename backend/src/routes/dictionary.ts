import { Router } from 'express'

const router = Router()

router.get('/lookup', async (req, res) => {
	const query = req.query.q as string

	if (!query) {
		return res.status(400).json({ error: 'Missing query' })
	}

	const url = new URL(
		'https://dictionary.yandex.net/api/v1/dicservice.json/lookup'
	)
	url.searchParams.set('key', process.env.YANDEX_APIKEY ?? '')
	url.searchParams.set('lang', detectLanguage(query))
	url.searchParams.set('text', query)

	const response = await fetch(url)

	if (!response.ok) {
		throw new Error(`Yandex Dictionary API error: ${response.status}`)
	}

	const data = await response.json()

	res.json(data)
})

function detectLanguage(query: string): 'en-ru' | 'ru-en' {
	return /\p{Script=Cyrillic}/u.test(query) ? 'ru-en' : 'en-ru'
}

export default router
