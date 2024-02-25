
import bullMQ from 'npm:bullmq'
import JobsConfiguration from './JobsConfiguration.ts'

export enum Queues {
  PrintTimeQueue = 'PrintTimeQueue'
}

export const QueuesValues = Object.values(Queues)

export default class Queue {
  
  private connection = JobsConfiguration.connection
  private queueName: Queues | null = null
  private queueOptions: bullMQ.QueueOptions = { connection: this.connection }
  private workerOptions: bullMQ.WorkerOptions = { connection: this.connection }
  private worker: bullMQ.Worker | null = null
  private queue: bullMQ.Queue | null = null
  
  constructor(queueName: Queues, payload?: Omit<bullMQ.QueueOptions, 'connection'>) {
    this.setQueueName(queueName)
    const payloadHasKeys = payload && Object.keys(payload).length > 0
    if (payloadHasKeys) this.setQueueOptions(payload)
  }

  private setQueueOptions(payload: Omit<bullMQ.QueueOptions, 'connection'>) {
    this.queueOptions = Object.assign(this.queueOptions, payload)
  }

  private setQueueName(name: Queues) {
    if (!name) throw new Error('Queue name is required')
    if (typeof name !== 'string') throw new Error('Queue name must be a string')
    if (!QueuesValues.includes(name)) throw new Error('Queue name doesnt exist on Queues enum!')
    this.queueName = name
  }

  create() {
    if (!this.queueName) throw new Error('Queue name is required')
    this.queue = new bullMQ.Queue(this.queueName, this.queueOptions)
    return this.queue 
  }
  
  func(processor?: unknown) {
    if (!this.queueName) throw new Error('Queue name is required')
    this.worker = new bullMQ.Worker(this.queueName, processor, this.workerOptions)
    this.worker.on('completed', (job) => {
      if (JobsConfiguration.outputConfiguration.terminalLogs) {
        console.log(`Job completed with result ${job.returnvalue}`)
      }
      if (JobsConfiguration.outputConfiguration.outputToJsonFile) {
        Deno.mkdir(`jobs/output/${this.queueName}`, { recursive: true })
        Deno.writeTextFile(`jobs/output/${this.queueName}/${job.processedOn}.json`, JSON.stringify(job, null, 2))
      }
    })
    return this.worker
  }
}