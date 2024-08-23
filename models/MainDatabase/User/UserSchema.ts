import mongoose from "npm:mongoose";
import { hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts";
import UserClass from "./UserClass.ts";
import BaseSchema, { required } from "../../../base/BaseSchema.ts";
import is from "jsr:@zarco/isness";
export enum LoginType {
  email = "email",
  cellphone = "cellphone",
}

export const LoginTypeValues = Object.values(LoginType);
export type IUserDocument = IUser & mongoose.Document;
export interface IUser extends IUserVirtuals {
  name: string;
  login: string;
  loginType: LoginType;
  password: string;
}

interface IUserVirtuals {
  firstTwoNameLetters?: string;
}

class UserSchemaClass extends BaseSchema {
  constructor() {
    super({
      name: {
        type: String,
        required: required("O usuário deve ter um nome!"),
        validate: {
          validator: is.fullName,
          message: "O nome do usuário deve ter pelo menos 2 caracteres!",
        },
      },
      login: {
        type: String,
        required: required("O usuário deve ter login!"),
        validate: {
          validator: function (value: string) {
            if ((this as IUserDocument).loginType === LoginType.email) {
              return is.email(value);
            }
            if ((this as IUserDocument).loginType === LoginType.cellphone) {
              return is.string(value) // add is.cellphone
            }
          },
          message: `Login inválido! Use ${LoginTypeValues.join(" ou ")}`,
        },
        message: "Login inválido!",
      },
      loginType: {
        type: String,
        enum: LoginTypeValues,
        required: required("O usuário deve escolher um tipo de login!"),
        message: "Teste?",
        validate: {
          validator: function (value: LoginType) {
            return LoginTypeValues.includes(value);
          },
          message: `Tipo de login inválido: {VALUE}! Disponíveis: ${
            LoginTypeValues.join(", ")
          }`,
        },
      },
      password: {
        type: String,
        required: required("O usuário deve ter uma senha!"),
        validate: {
          validator: is.string, // add is.strongPassword
          message: "A senha deve ter pelo menos 8 caracteres!",
        },
      },
    }, {});
  }
}

const UserSchema = new UserSchemaClass().schema;

UserSchema.index({ login: 1 }, { unique: true });

UserSchema.pre("save", async function (this: IUserDocument, next) {
  if (this.isModified("password")) {
    this.password = await hash(this.password, Deno.env.get("BCRYPT_SALT"));
  }
  next();
});

UserSchema.loadClass(UserClass);

export default UserSchema;
