import { Schema } from "npm:mongoose"
import { hash } from "https://deno.land/x/bcrypt@v0.4.1/mod.ts"

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
  }
})

UserSchema.index({ login: 1 }, { unique: true })

UserSchema.pre('save', async function(next) {                                                                                                                                        
  if(this.isModified('password')) {
    this.password = await hash(this.password, Deno.env.get('BCRYPT_SALT'))
  }                                                                                                                                                      
  next()                                                                                                                                                                     
}) 

export default UserSchema
