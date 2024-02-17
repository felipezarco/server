  import { model, Schema } from "npm:mongoose"

  export enum LoginType {
    email = 'email',
    phone = 'phone',
  }

  export const LoginTypeValues = Object.values(LoginType)

  export interface IUser {
    name: string
    login: string
    loginType: LoginType
    password: string
  }

  const UserSchema = new Schema({
    name: {
      type: String,
      required: [true, 'O usuário deve ter um nome!'],
    },
    login: {
      type: String,
      required: [true, 'O usuário deve ter login!'],
    },
    loginType: {
      type: String,
      enum: LoginTypeValues,
      required: [true, 'O usuário deve escolher um tipo de login!'],
      message: `Tipo de login inválido: {VALUE}! Disponíveis: ${LoginTypeValues.join(", ")}`,
    },
    password: {
      type: String,
      required: [true, 'O usuário deve ter uma senha!'],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
  })

  export default model('User', UserSchema)
