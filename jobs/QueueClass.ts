
import bullMQ from 'npm:bullmq'
import RedisConfiguration from '../config/RedisConfiguration.ts'

export default class QueueClass {
  
  private queueOptions: bullMQ.QueueOptions
  private defaultQueueOptions: bullMQ.QueueOptions = {
    connection: RedisConfiguration.connection
  }

  constructor(payload?: Omit<bullMQ.QueueOptions, 'connection'>) {
    this.queueOptions = this.defaultQueueOptions
    const payloadHasKeys = payload && Object.keys(payload).length > 0
    if (payloadHasKeys) this.setQueueOptions(payload)
  }

  private setQueueOptions(payload: Omit<bullMQ.QueueOptions, 'connection'>) {
    this.queueOptions = Object.assign(this.queueOptions, payload)
  }

  create(name: string) {
    return new bullMQ.Queue(name, this.queueOptions)
  }

}