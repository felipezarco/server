import { model, Model } from "npm:mongoose";
import UserSchema, { IUser } from "./User.schema.ts";
import BaseRepository from "../../base/Base.repository.ts";
import User from "./User.model.ts";

class UserRepository extends BaseRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model)
  }

  findByLogin(login: IUser['login']) {
    return this.model.findOne({ login })
  }
}

export default new UserRepository(
  model<IUser>('User', UserSchema.loadClass(User))
)
