import UserRepository from "../models/User/User.ts";
import { Request, Response } from "npm:express";

export default class UserController {
  static async create(req: Request, res: Response): Promise<Response>{
    const { name, login, loginType, password } = req.body;

    
    const user = await UserRepository.create({
      name,
      login,
      loginType,
      password,
    });


    return res.send_ok("Bem-vindo(a), " + user.firstTwoNameLetters, user);
  }

  static async update(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const { name, login, loginType, password } = req.body;
    const user = await UserRepository.update(id, { name, login, loginType, password });
    return res.send_ok("Usuário atualizado com sucesso", user);
  }

  static async delete(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    await UserRepository.delete(id);
    return res.send_ok("Usuário deletado com sucesso!");
  }

  static async findAll(_req: Request, res: Response): Promise<Response>{
    const users = await UserRepository.findMany({});
    return res.send_ok("Usuários encontrados com sucesso!", users);
  }

  static async findOne(req: Request, res: Response): Promise<Response>{
    const { id } = req.params;
    const user = await UserRepository.findOne({ id });
    return res.send_ok("Usuário encontrado com sucesso!", user);
  }
}