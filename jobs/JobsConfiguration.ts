export default class JobsConfiguration {
  static connection = {
    host: "localhost",
    port: 6379,
  };

  static outputConfiguration = {
    terminalLogs: false,

    /*****************************************************************
      Zarco says: outputs to jobs/output/ (this folder is in .gitignore)
      Beware setting to true: this will potentially create a lot of files!
    ******************************************************************/
    outputToJsonFile: false,
  };
}
