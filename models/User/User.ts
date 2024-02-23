import { model, Model } from "npm:mongoose";
import UserSchema, { IUser } from "./User.schema.ts";
import BaseRepository from "../../base/Base.repository.ts";

class User extends BaseRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model)
  }

  findByLogin(login: IUser['login']) {
    return this.model.findOne({ login })
  }
}

export default new User(
  model<IUser>('User', UserSchema)
)
