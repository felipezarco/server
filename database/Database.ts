
import mongoose from "npm:mongoose"
import Print from "../globals/output/Print.ts";
import Env from "../config/Env.ts";

interface IDatabaseConnection {
  username: string
  hostname: string
  database: string
}

export class Database {
  private username: string
  private password: string
  private hostname: string
  private database: string

  constructor(databaseConnection: IDatabaseConnection) {
    this.hostname = databaseConnection.hostname
    this.database = databaseConnection.database
    this.username = databaseConnection.username
    this.password = Env.getDatabasePasswordByUsername(this.username)
    this.validate()
  }
 
  private validate = (): void => {
    if (!this.username) throw Error('[Database] Please provide a database username!')
    if (!this.hostname) throw Error('[Database] Please provide a database hostname!')
    if (!this.database) throw Error('[Database] Please provide a database name!')
    if (!this.password) throw Error('[Database] Please provide a database password!')
  }

  private get connectionString(): string {
    return `mongodb+srv://${this.username}:${this.password}@${this.hostname}/${this.database}?retryWrites=true&w=majority`
  }
  
  public connect = async (): Promise<typeof mongoose | void> => {
    try {
      console.log(this.connectionString)
      const connection = await mongoose.connect(this.connectionString)
      if (connection) Print.success(`Successfully connected to ${this.database} at ${this.hostname}`)
      return connection
    } catch (error) {
      Print.failure(`Error connecting to database: ${error}`)
    }
  }
}