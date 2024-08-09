
// @deno-types='npm:@types/express'
import { Router, Request, Response } from 'npm:express'
import UserRouter from "../features/auth/User/User.router.ts";

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

AuthRouter.use(UserRouter)
export default AuthRouter
