import UserRepository from "../../../models/User/UserRepository.ts";
import { Request, Response } from "npm:express";

export default class UserController {

  private userRepository: UserRepository

  constructor({
    userRepository = new UserRepository()
  } = {}) {
    this.userRepository = userRepository
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    const { name, login, loginType, password } = req.body;

    const user = await this.userRepository.create({
      name,
      login,
      loginType,
      password,
    });

    return res.send_ok("Bem-vindo(a), " + user.firstTwoNameLetters, user);
  }

  findMany = async (_req: Request, res: Response): Promise<Response> => {
    const users = await this.userRepository.findMany({});
    for (let user of users) {
      console.log(user.firstTwoNameLetters)
    }
    return res.send_ok("Usuários encontrados com sucesso!", users);
  }

  findOne = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const user = await this.userRepository.findOne({ id });
    return res.send_ok("Usuário encontrado com sucesso!", user);
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    const { name, login, loginType, password } = req.body;
    const user = await this.userRepository.update(id, { name, login, loginType, password });
    return res.send_ok("Usuário atualizado com sucesso", user);
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    const { id } = req.params;
    await this.userRepository.delete(id);
    return res.send_ok("Usuário deletado com sucesso!");
  }

}