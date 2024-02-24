import mongoose from "npm:mongoose"
import { hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"
import UserClass from "./User.class.ts"
import BaseSchema, { required }  from "./../../base/Base.schema.ts"

export enum LoginType {
  email = 'email',
  phone = 'phone',
}

export const LoginTypeValues = Object.values(LoginType)

export interface IUser extends IUserVirtuals  {
  name: string
  login: string
  loginType: LoginType
  password: string
}

interface IUserVirtuals extends mongoose.Document {
  firstTwoNameLetters?: string
}

class UserSchemaClass extends BaseSchema {
  constructor() {
    super({
      name: {
        type: String,
        required: required('O usuário deve ter um nome!'),
      },
      login: {
        type: String,
        required: required('O usuário deve ter login!'),
      },
      loginType: {
        type: String,
        enum: LoginTypeValues,
        required: required('O usuário deve escolher um tipo de login!'),
        message: `Tipo de login inválido: {VALUE}! Disponíveis: ${LoginTypeValues.join(", ")}`,
      },
      password: {
        type: String,
        required: required('O usuário deve ter uma senha!'),
      },
      

    }, {})
  }
}

const UserSchema = new UserSchemaClass().schema

UserSchema.index({ login: 1 }, { unique: true })

UserSchema.pre('save', async function(this: IUser, next) {     
  if(this.isModified('password')) {
    this.password = await hash(this.password, Deno.env.get('BCRYPT_SALT'))
  }                                                                                                                                                      
  next()                                                                                                                                                                     
}) 

UserSchema.loadClass(UserClass)

export default UserSchema
