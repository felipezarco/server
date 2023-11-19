import { load } from 'https://deno.land/std@0.201.0/dotenv/mod.ts'

type ConstEnum<T, V = string> = Extract<T[keyof T], V>
type EnvironmentName = ConstEnum<typeof EnvironmentName>

const environmentName = Deno.args[0] as EnvironmentName

const EnvironmentName = { development: 'development', production: 'production' } as const

await load({
  envPath: `.env.${environmentName}`,
  examplePath: '.env.example',
  defaultsPath: '.env.defaults',
  allowEmptyValues: false,
  export: true
})

// const EnvSchema = Schema({
//   APP: string,
//   PORT: number.optional(),
//   IP: string.optional(),
// })

// const envObject = Deno.env.toObject()

// const [err] = EnvSchema.destruct().validator()

// if (err) throw new Error(err)

if (Object.values(EnvironmentName).includes(environmentName) === false) {
  throw new Error(`Invalid EnvironmentName: ${environmentName}`)
}

export default class Env {
  
  static get environmentName() {
    return environmentName
  }

  static get isDevelopment() {
    return environmentName === EnvironmentName.development
  }

  static get isProduction() {
    return environmentName === EnvironmentName.production
  }

  static get object() {
    return Deno.env.toObject()
  }

  static get app() {
    return Deno.env.get('APP')
  }

  static get port() {
    return Number(Deno.env.get('PORT')) || 3000
  }

  static get ip() {
    return Deno.env.get('IP')
  }


}