// @deno-types='npm:@types/express'
import { Router } from 'npm:express'
import UserController from "./UserController.ts";

const UserRouter = Router()

const userController = new UserController()

/**
 * @openapi
 * /auth/users:
 *   post:
 *     description: Create a new user
 *     responses:
 *       201:
 *         description: Returns the created user
 *       400:
 *         description: Bad request
 */

UserRouter.post('/auth/users', userController.create)

/**
 * @openapi
 * /auth/users:
 *   get:
 *     description: Returns all users
 *     responses:
 *       200:
 *         description: Returns all users
 *       404:  
 *         description: No users found
 */

UserRouter.get('/auth/users', userController.findMany)

/**
 * @openapi
 * /auth/users/{id}:
 *   get:
 *     description: Returns a user by id
 *     responses:
 *       200:
 *         description: Returns a user
 *       404:
 *         description: User not found
 */

UserRouter.get('/auth/users/:id', userController.findOne)

/**
 * @openapi
 * /auth/users/{id}:
 *   patch:
 *     description: Update a user by id
 *     responses:
 *       200:
 *         description: Returns the updated user
 *       404:
 *         description: User not found
 */

UserRouter.patch('/auth/users/:id', userController.update)

/**
 * @openapi
 * /auth/users/{id}:
 *   delete:
 *     description: Delete a user by id
 *     responses:
 *       200:
 *         description: Returns the deleted user
 *       404:
 *         description: User not found
 */

UserRouter.delete('/auth/users/:id', userController.delete)
export default UserRouter
