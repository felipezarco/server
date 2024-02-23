import { model } from "npm:mongoose"
import UserSchema, { IUser } from "./User.schema.ts"


class User implements IUser {
  name: IUser['name']
  login: IUser['login']
  loginType: IUser['loginType']
  password: IUser['password']

  constructor(user: IUser) {
    this.name = user.name
    this.login = user.login
    this.loginType = user.loginType
    this.password = user.password
  }

}

export default model<IUser>('User', UserSchema.loadClass(User))


