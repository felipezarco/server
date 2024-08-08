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
import { Database } from "./database/Database.ts"
import log from "./globals/output/log.ts"
import BackgroundJobs from './jobs/BackgroundJobs.ts'

const app = express()

app.use(cors())
app.use(helmet())

app.use(responser.default)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(express.static('public'))

/***************************************************************** 
  Zarco says: Never split route path into multiple files
  It's good to be able to search "/my/awesome/route/complete/path"
******************************************************************/

app.use(docsRouter)
app.use(unauthRouter)
app.use(authRouter)

const db = new Database({
  hostname: 'mongodbcluster.8twlhdy.mongodb.net',
  database: 'MAIN_DATABASE',
  username: 'mongoclusteradmin2845',
})

await db.connect()

if (app) {
  app.listen(Env.serverPort, () => {
    log(`
      Back-end is running on port ${Env.ip}:${Env.serverPort} (${Env.name})
    `)
  })
}

BackgroundJobs.enqueueBackgroundJobQueues()

