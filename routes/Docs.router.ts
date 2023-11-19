
// @deno-types='npm:@types/express'
import { Router } from 'npm:express'
import Swagger from '../docs/Swagger.ts'

const DocsRouter = Router()

const authSwagger = new Swagger({
  title: 'Auth API Documentation',
  version: '1.0.0',
  routerPaths: [
    './routes/auth.router.ts'
  ]
})

DocsRouter.use('/auth', authSwagger.setupAndServe())

const unauthSwagger = new Swagger({
  title: 'Unauth API Documentation',
  version: '1.0.0',
  routerPaths: [
    './routes/unauth.router.ts'
  ]
})

DocsRouter.use('/unauth', unauthSwagger.setupAndServe())

export default DocsRouter
