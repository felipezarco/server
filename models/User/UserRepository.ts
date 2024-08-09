import mongoose from "npm:mongoose";
import UserSchema, { IUser } from "./UserSchema.ts";
import BaseRepository from "../../base/BaseRepository.ts";

class UserRepository extends BaseRepository<IUser> {
  constructor(model: mongoose.Model<IUser>) {
    super(model)
  }

  findByLogin(login: IUser['login']) {
    return this.model.findOne({ login })
  }
}
export default new UserRepository(
  mongoose.model<IUser>('User', UserSchema)
) 
