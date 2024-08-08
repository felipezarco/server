
// @deno-types='npm:@types/express'
import { Router, Request, Response } from 'npm:express'
import UserController from "../controllers/User.controller.ts";

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

AuthRouter.get('/auth/ok', (_req: Request, res: Response) => {
  return res.send_ok('OK')
})


// UserController
AuthRouter.post('/auth/users', UserController.create)
AuthRouter.get('/auth/users', UserController.findAll)
AuthRouter.get('/auth/users/:id', UserController.findOne)
AuthRouter.patch('/auth/users/:id', UserController.update)
AuthRouter.delete('/auth/users/:id', UserController.delete)



export default AuthRouter
