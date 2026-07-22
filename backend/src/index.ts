import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import dashboardRoute from './routes/dashboard.ts'
import dictionaryRoute from './routes/dictionary.ts'
import listeningRoute from './routes/listening.ts'

const app = express()

app.use(cors())
app.use(express.json())

app.use('/api/dashboard', dashboardRoute)
app.use('/api/dictionary', dictionaryRoute)
app.use('/api/listening', listeningRoute)

app.listen(3000, () => {
	console.log('Server running on port 3000')
})
