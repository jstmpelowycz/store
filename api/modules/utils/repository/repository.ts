import {Client, Pool} from "pg";
import {Logger, LoggerInput} from "../logger/logger.typedefs";
import {AnyAsyncFunction, Throwable} from "../../../api.typedefs";
import {AsyncQueryWrapper} from "./repository.typedefs";
import {RepositoryError} from "./repository.constants";

export class Repository {
  private readonly pool: Pool;
  private readonly logger: Logger;

  constructor(pool: Pool) {
    this.pool = pool;
    this.logger = console;
  }

  protected async runQuery<RT>(query: string): Promise<RT> {
    const wrapper = await this.createQueryWrapper<RT>();

    return wrapper(async () => {
      await this.pool.query(query);
    });
  }

  private async createQueryWrapper<RT>(): Throwable<AsyncQueryWrapper<RT>> {
    await this.pool.connect();

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
        await this.pool.end();
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
