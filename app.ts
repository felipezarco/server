
// @deno-types='npm:@types/express' 
import express from 'npm:express'
import responser from 'npm:responser'
// @deno-types='npm:@types/cors'
import cors from 'npm:cors'
// @deno-types='npm:@types/morgan'
import morgan from 'npm:morgan'
// @deno-types='npm:@types/helmet'
import helmet from 'npm:helmet'

import docsRouter from './routes/Docs.router.ts'
import unauthRouter from './routes/Unauth.router.ts'
import authRouter from './routes/Auth.router.ts'
import Env from './config/Env.ts'

const app = express()

app.use(cors())
app.use(helmet())

app.use(responser.default)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static('public'))

app.use('/docs', docsRouter)
app.use('/unauth', unauthRouter)
app.use('/auth', authRouter)

app.listen(Env.port, () => {
  console.info(`Server is running on port 3000 (${Env.environmentName})`)
})

