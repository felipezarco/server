
// @deno-types='npm:@types/express'
import { Router } from 'npm:express'
import Swagger from '../docs/Swagger.ts'

/***************************************************************** 
  Zarco says: This will be generated based on @openai comments
  Swagger json files will be generated in ./docs/jsons
******************************************************************/

const DocsRouter = Router()

const authSwagger = new Swagger({
  title: 'Auth API Documentation',
  version: '1.0.0',
  routerPaths: [
    './routes/Auth.router.ts'
  ]
})

DocsRouter.use('/docs/auth', authSwagger.setupAndServe())

const unauthSwagger = new Swagger({
  title: 'Unauth API Documentation',
  version: '1.0.0',
  routerPaths: [
    './routes/Unauth.router.ts'
  ]
})

DocsRouter.use('/docs/unauth', unauthSwagger.setupAndServe())

export default DocsRouter
