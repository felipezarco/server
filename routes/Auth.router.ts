
// @deno-types='npm:@types/express'
import { Router, Request, Response } from 'npm:express'
import UserController from "../features/Users/User.controller.ts";

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



AuthRouter.get('/users', UserController.findAll)

export default AuthRouter
