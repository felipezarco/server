import bullMQ from 'npm:bullmq'
import RedisConfiguration from "../config/RedisConfiguration.ts";
import PrintTimeQueue from "./queues/PrintTimeQueue.ts";
import Print from "../globals/output/Print.ts";
export interface JobOptions {
  terminalLogs?: boolean
}

const defaultOptions: JobOptions = {
  terminalLogs: true
}

export default class Jobs {
  
  private options: JobOptions

  private workerOptions: bullMQ.WorkerOptions

  constructor(payload: JobOptions = defaultOptions) {
    this.options = payload
    this.workerOptions = { 
      connection: RedisConfiguration.connection
    }
  }

  run() {
    PrintTimeQueue.add('random', { randomStuff: new Date() }, {
      repeat: {
        every: 4000,
      }
     })
  }
}
