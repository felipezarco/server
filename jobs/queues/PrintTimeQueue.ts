import log from "../../globals/output/log.ts";
import QueueClass from "../Queue.ts"
import { Queues } from "../Queue.ts"
import bullMQ from 'npm:bullmq'

const queueInstance = new QueueClass(Queues.PrintTimeQueue, {})
const PrintTimeQueue = queueInstance.create()

queueInstance.func(
  (_job: bullMQ.Job) => {
    log(_job)
    log('Time now is ' + new Date())
  }
)

export default PrintTimeQueue