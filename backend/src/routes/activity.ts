import { Router } from "express";
import { createActivity } from "../repositories/activityRepository.ts";

const router = Router()

router.post('/save-activity', async (req, res) => {
	const { activityTitle, secondsSpent } = req.body

	try {
		const result = await createActivity(activityTitle, secondsSpent)
	} catch (error) {
		console.error(error)
		res.status(500).json({ message: 'Failed to save activity' })
	}

	res.json({
		success: true,
		message: 'Activity saved successfully!'
	})
})

export default router
