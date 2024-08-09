import UserRepository from "../../../models/User/UserRepository.ts";
import { Request, Response } from "npm:express";

export default class UserController {
  private userRepository: typeof UserRepository;

  constructor(userRepository: typeof UserRepository = UserRepository) {
    this.userRepository = userRepository;
  }

  async create(req: Request, res: Response): Promise<Response> {
    const { name, login, loginType, password } = req.body;

    const user = await this.userRepository.create({
      name,
      login,
      loginType,
      password,
    });

    return res.send_ok("Bem-vindo(a), " + user.firstTwoNameLetters, user);
  }

  async update(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { name, login, loginType, password } = req.body;
    const user = await this.userRepository.update(id, { name, login, loginType, password });
    return res.send_ok("Usuário atualizado com sucesso", user);
  }

  async delete(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    await this.userRepository.delete(id);
    return res.send_ok("Usuário deletado com sucesso!");
  }

  async findAll(_req: Request, res: Response): Promise<Response> {
    const users = await this.userRepository.findMany({});
    return res.send_ok("Usuários encontrados com sucesso!", users);
  }

  async findOne(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const user = await this.userRepository.findOne({ id });
    return res.send_ok("Usuário encontrado com sucesso!", user);
  }
}