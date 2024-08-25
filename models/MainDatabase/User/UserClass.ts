import { IAddress } from "../Address/AddressSchema.ts";
import { IUser } from "./UserSchema.ts";

class UserClass implements IUser {
  name: IUser["name"];
  login: IUser["login"];
  loginType: IUser["loginType"];
  password: IUser["password"];

  constructor(user: IUser) {
    this.name = user.name;
    this.login = user.login;
    this.loginType = user.loginType;
    this.password = user.password;
  }

  get firstTwoNameLetters() {
    return this.name.slice(0, 2);
  }

}

export default UserClass;
