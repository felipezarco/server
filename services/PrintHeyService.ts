import Print from "../globals/output/Print.ts";

class PrintHeyService {
  static printHey(name: string) {
    Print.info(
      `Hey ${name}, server is still running!`
    )
  }
}

export default new PrintHeyService()