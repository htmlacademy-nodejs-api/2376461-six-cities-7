import * as Mongoose from 'mongoose';
import { inject, injectable } from 'inversify';

import { DatabaseClient } from './database-client.interface.js';
import { Component } from '../../enums/index.js';
import { Logger } from '../logger/index.js';

import { setTimeout } from 'node:timers/promises';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;

  constructor(@inject(Component.Logger) private readonly logger: Logger){
    this.isConnected = false;
  }

  public isConnectedToDatabase(){
    return this.isConnected;
  }

  public async connect(url: string): Promise<void> {
    if(this.isConnectedToDatabase()){
      throw new Error('MongoDB was connected');
    }

    this.logger.info('Try to connect MongoDB');

    let attempt = 0;
    while(attempt < RETRY_COUNT) {
      try{
        this.mongoose = await Mongoose.connect(url);
        this.isConnected = true;
        this.logger.info('Database connection established');
        return;
      } catch(err){
        attempt++;
        this.logger.error(`Failed to connect to the DB... Attempt: ${attempt}`,err as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(`Unable to established database connection after ${RETRY_TIMEOUT}`);
  }

  public async disconnect(): Promise<void> {
    if(!this.isConnectedToDatabase()){
      throw new Error('MongoDB not connected');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed');
  }
}
