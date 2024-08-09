
// @deno-types='npm:@types/express'
import { Router } from 'npm:express'
import UserController from "./User.controller.ts";

const UserRouter = Router()

UserRouter.get('/auth/users', UserController.findAll)
UserRouter.get('/auth/users/:id', UserController.findOne)
UserRouter.patch('/auth/users/:id', UserController.update)
UserRouter.delete('/auth/users/:id', UserController.delete)
export default UserRouter
