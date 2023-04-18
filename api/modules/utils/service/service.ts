import {Client} from "pg";
import {Throwable} from "../../../api.typedefs";
import {Logger, LoggerInput} from "../logger/logger.typedefs";

export class Service {
  private readonly client: Client;
  private readonly logger: Logger;

  constructor(client: Client) {
    this.client = client;
    this.logger = console;
  }

  protected logInfo(input: LoggerInput): void {
    this.logger.info(input);
  }

  protected throwError(input: LoggerInput): Throwable {
    const {message, fields} = input;

    this.logger.error(fields);

    throw new Error(message)
  }
}

