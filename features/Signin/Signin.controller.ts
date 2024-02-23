
import { UserRepository } from '../User/User.repository'

export default class SigninController {

  async signin(req: Request, res: Response) {
    const { login, password } = req.body
    const user = await UserRepository.findByLogin(login)
    if (!user) {
      return res.send_notFound('Usuário não encontrado!')
    }
    if (user.password !== password) {
      return res.status(401).json({ message: 'Senha inválida!' })
    }
    return res.status(200).json({ message: 'Usuário logado com sucesso!' })
  }
}