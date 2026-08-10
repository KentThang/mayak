import { Router } from 'express'
import * as cheerio from 'cheerio'
import { createListeningExercise, fetchAllListeningExercises } from '../repositories/listeningExerciseRepository.ts'
import { fetchAllPastListensWithExerciseId } from '../repositories/pastListenRepository.ts'

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

// TODO: add try catch
router.post('/save-exercise', async (req, res) => {
	const { title, link } = req.body

	const result = await createListeningExercise(title, link)

	res.json({ success: true })
})

// TODO: add try catch
router.get('/get-all-listening-exercises', async (req, res) => {
	const allListeningExercises = await fetchAllListeningExercises()

	res.json(allListeningExercises)
})

router.get('/get-past-listens', async (req, res) => {
	const exerciseId = req.query.exerciseId as string

	if (!exerciseId) {
		return res.status(400).json({ error: "Missing query parameter 'exerciseId'" })
	}

	try {
		const allPastListensForExercise = await fetchAllPastListensWithExerciseId(exerciseId)
		res.json(allPastListensForExercise)
	} catch (error) {
		console.error(error)
		res.status(500).json({ error: 'Failed to fetch past listens' })
	}

})

export default router
