import { Router } from 'express'
import * as cheerio from 'cheerio'
import { createListeningExercise } from '../repositories/listeningExerciseRepository.ts'

const router = Router()

// Uses Cheerio to fetch the HTML title tag contents
router.get('/lookup', async (req, res) => {
	const url = req.query.q as string

	if (!url) {
		return res.status(400).json({ error: "Missing query parameter 'q'" })
	}

	try {
		new URL(url)
	} catch {
		return res.status(400).json({ error: 'Invalid URL' })
	}

	let response: Response
	try {
		response = await fetch(url)
	} catch {
		return res.status(500).json({ error: 'Failed to fetch URL' })
	}

	if (!response.ok) {
		return res.status(response.status).json({
			error: `Request failed (${response.status})`,
		})
	}

	const html = await response.text()

	const $ = cheerio.load(html)

	const title =
		$('meta[property="og:title"]').attr('content') ?? $('title').text()

	console.log(title)
	res.json(title)
})

router.post('/save-exercise', async (req, res) => {
	const { title, link } = req.body

	const result = await createListeningExercise(title, link)

	res.json()
})

export default router
