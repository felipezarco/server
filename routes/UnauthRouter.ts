import { Router, Request, Response } from 'npm:express'

const UnauthRouter = Router()

/**
 * @openapi
 * /unauth/status:
 *   get: 
 *     description: Check Server Status
 *     responses:
 *       200:
 *         description: Returns OK.
 */

UnauthRouter.get('/unauth/status', (_req: Request, res: Response) => {
  return res.send_ok('Server is Available')
})

export default UnauthRouter
