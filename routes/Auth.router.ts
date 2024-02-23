
// @deno-types='npm:@types/express'
import { Router, Request, Response } from 'npm:express'
import UserController from "../features/controllers/User.controller.ts";

const AuthRouter = Router()

/**
 * @openapi
 * /:
 *   get:
 *     description: Welcome to swagger-jsdoc!
 *     responses:
 *       200:
 *         description: Returns OK.
 */

AuthRouter.get('/ok', (_req: Request, res: Response) => {
  return res.send_ok('OK')
})


// User routes
AuthRouter.post('/users', UserController.create)
AuthRouter.get('/users', UserController.findAll)
AuthRouter.get('/users/:id', UserController.findOne)
AuthRouter.patch('/users/:id', UserController.update)
AuthRouter.delete('/users/:id', UserController.delete)

export default AuthRouter
