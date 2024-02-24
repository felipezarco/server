import RedisConfiguration from "../../config/RedisConfiguration.ts";
import QueueClass from "../QueueClass.ts"
import Queues from "../Queues.ts";
import bullMQ from 'npm:bullmq'
export const PrintTimeQueue = new QueueClass({}).create(Queues.PrintTimeQueue)

const worker = new bullMQ.Worker(Queues.PrintTimeQueue, (job: bullMQ.Job) => {
  console.log(job.name, job.data)
}, { connection: RedisConfiguration.connection
})

// if (this.options.terminalLogs) {  
//   worker.on('completed', (job) => {
//     console.log(`Job completed with result ${job.returnvalue}`)
//   })
// }

export default PrintTimeQueue