import { Model } from "npm:mongoose";
import User, { IUser } from "./User.model.ts";
import BaseRepository from "../../base/Base.repository.ts";

class UserRepository extends BaseRepository<IUser> {
  constructor(model: Model<IUser>) {
    super(model)
  }

  findByLogin(login: IUser['login']) {
    return this.model.findOne({ login })
  }
}

export default new UserRepository(User as Model<IUser>)
