import {Client} from "pg";
import {Logger, LoggerInput} from "../logger/logger.typedefs";
import {AnyAsyncFunction, Throwable} from "../../../api.typedefs";
import {AsyncQueryWrapper} from "./repository.typedefs";
import {RepositoryError} from "./repository.constants";

export class Repository {
  private readonly client: Client;
  private readonly logger: Logger;

  constructor(client: Client) {
    this.client = client;
    this.logger = console;
  }

  protected async runQuery<RT>(query: string): Promise<RT> {
    const wrapper = await this.createQueryWrapper<RT>();

    return wrapper(async () => {
      await this.client.query(query);
    });
  }

  private async createQueryWrapper<RT>(): Throwable<AsyncQueryWrapper<RT>> {
    await this.client.connect();

    return async (callback: AnyAsyncFunction) => {
      try {
        return callback();
      } catch (error) {
        this.throwError({
          message: RepositoryError.QueryRunFailed,
          fields: {
            error,
          },
        });
      } finally {
        await this.client.end();
      }
    }
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
