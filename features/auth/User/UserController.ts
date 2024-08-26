import UserRepository from "../../../models/MainDatabase/User/UserRepository.ts";
import { Request, Response, NextFunction } from "npm:express";

export default class UserController {
  private userRepository: UserRepository;

  constructor({
    userRepository = new UserRepository(),
  } = {}) {
    this.userRepository = userRepository;
  }

  create = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { name, login, loginType, password } = req.body;

      const user = await this.userRepository.create({
        name,
        login,
        loginType,
        password
      });

      return res.send_ok("Bem-vindo(a), " + user.firstTwoNameLetters, user);
    } catch (err) {
      next(err);
    }
  };

  findMany = async (
    _req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {

      const users = await this.userRepository.findMany({});

      for (const user of users) {
        user.firstTwoNameLetters = user.name.slice(0, 2);
      }
     
      return res.send_ok("Usuários encontrados com sucesso!", users);

    } catch (err) {
      next(err);
    }
  };

  findOne = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const user = await this.userRepository.findById(id);
      return res.send_ok("Usuário encontrado com sucesso!", user);
    } catch (err) {
      next(err);
    }
  };

  update = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      const { name, login, loginType, password } = req.body;
      const user = await this.userRepository.update(id, {
        name,
        login,
        loginType,
        password,
      });
      return res.send_ok("Usuário atualizado com sucesso", user);
    } catch (err) {
      next(err);
    }
  };

  delete = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ): Promise<Response> => {
    try {
      const { id } = req.params;
      await this.userRepository.delete(id);
      return res.send_ok("Usuário deletado com sucesso!");
    } catch (err) {
      next(err);
    }
  };
}
