export default class JobsConfiguration {
  static connection = {
    host: 'localhost',
    port: 6379
  }

  static outputConfiguration = {
    
    terminalLogs: false,

    /* Zarco says: outputs to path: jobs/output/ (this folder is in .gitignore) */
    /* Zarco warns: this will potentially create a lot of files! Beware setting to true. */ 
    outputToJsonFile: false, 
  }
}