import { Logger } from '../shared/libs/logger/index.js';
import { Config, RestSchema } from '../shared/libs/config/index.js';

export class RestApplication {
  constructor (
    private readonly logger: Logger,
    private readonly config: Config<RestSchema>,
  ){}

  public async init(){
    this.logger.info(`.env PORT: ${this.config.get('PORT')}`);
    this.logger.info('rest.application was init');
  }

}
