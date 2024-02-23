import { IUser } from "./User.schema.ts"

class User implements IUser {
  name: IUser['name']
  login: IUser['login']
  loginType: IUser['loginType']
  password: IUser['password']
  source: string

  constructor(user: IUser) {
    this.name = user.name
    this.login = user.login
    this.loginType = user.loginType
    this.password = user.password
    this.source = 'wow'
    console.log(user)
  }

  get firstTwoNameLetters () {
    return this.name.slice(0, 2)
  }
}

export default User


