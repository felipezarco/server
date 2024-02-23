import { load } from 'https://deno.land/std@0.201.0/dotenv/mod.ts'
type ConstEnum<T, V = string> = Extract<T[keyof T], V>
type EnvironmentName = ConstEnum<typeof EnvironmentName>
const name = Deno.args[0] as EnvironmentName
const EnvironmentName = { dev: 'dev', production: 'production' } as const

await load({
  envPath: `.env.${name}`,
  examplePath: '.env.example',
  defaultsPath: '.env.defaults',
  allowEmptyValues: false,
  export: true
})

// TODO: Validate 

if (Object.values(EnvironmentName).includes(name) === false) {
  throw new Error(`Invalid EnvironmentName: ${name}`)
}

export default class Env {
  
  static get name() {
    return name
  }

  static get dev() {
    return name === EnvironmentName.dev
  }

  static get production() {
    return name === EnvironmentName.production
  }

  static get object() {
    return Deno.env.toObject()
  }

  static get app() {
    return Deno.env.get('APP')
  }

  static get port() {
    return Number(Deno.env.get('PORT'))
  }

  static get serverPort() {
    return Number(Deno.env.get('SERVER_PORT'))
  }

  static get ip() {
    return Deno.env.get('IP') ?? 'localhost'
  }

  static getDatabasePasswordByUsername(databaseUsername: string): string {
    if (!databaseUsername) throw Error('Please provide a database username!')
    const password =  Deno.env.get(`DATABASE_PASSWORD_FOR_${databaseUsername}`)
    if (!password) throw Error(`No password found for ${databaseUsername}`)
    return password
  }
}