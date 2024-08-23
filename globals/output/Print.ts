export default class Print {
  public static success(message: string) {
    return console.info(`%c${message}`, "background-color: green");
  }

  public static failure(message: string) {
    return console.info(`%c${message}`, "background-color: red");
  }

  public static info(message: string) {
    return console.info(`%c${message}`, "background-color: blue");
  }
}
