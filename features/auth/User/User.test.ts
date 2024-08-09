import { MockResponser } from "../../../globals/Stubs.ts";
import { assertEquals } from 'https://deno.land/std@0.201.0/assert/mod.ts'
import UserController from "./UserController.ts"
import { Request } from "npm:express"
import UserRepository from "../../../models/User/UserRepository.ts"

/***************************************************************** 
  Zarco says: Note that you can mock whatever methods you need 
******************************************************************/

class MockUserRepository {
  findMany() {
    return Promise.resolve([
      { name: "John Doe", login: "johndoe", loginType: "email", password: "password123" },
      { name: "Jane Doe", login: "janedoe", loginType: "phone", password: "password456" },
    ])
  }
}

Deno.test("UserController: should return all users", async () => {
  const mockUserRepository = new MockUserRepository() as unknown as UserRepository

  const userController = new UserController({
    userRepository: mockUserRepository,
  })

  const mockRequest: Request = {}

  const result = await userController.findMany(mockRequest, MockResponser)

  assertEquals(result.message, "Usuários encontrados com sucesso!")
  assertEquals(result.data.length, 2)
  assertEquals(result.data?.[0].name, "John Doe")
  assertEquals(result.data?.[1].name, "Jane Doe")
})
