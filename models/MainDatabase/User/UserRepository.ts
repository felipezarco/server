import mongoose from "npm:mongoose";
import UserSchema, { IUser } from "./UserSchema.ts";
import BaseRepository from "../../../base/BaseRepository.ts";

class UserRepository extends BaseRepository<IUser> {
  constructor(model: mongoose.Model<IUser> = mongoose.model<IUser>('User', UserSchema)) {
    super(model)
  }

  findByLogin(login: IUser['login']) {
    return this.model.findOne({ login })
  }
}

export default UserRepository
