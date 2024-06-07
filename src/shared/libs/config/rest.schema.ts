import convict from 'convict';
import validator from 'convict-format-with-validator';

convict.addFormats(validator);

export type RestSchema = {
  PORT: number;
  SALT: string;
  DB_HOST: string;
  DB_USER: string;
  DB_PASSWORD: string;
  DB_PORT: string;
  DB_NAME: string;
};

export const configRestSchema = convict<RestSchema>({
  PORT: {
    doc: 'Port for oncoming connections',
    format: 'port',
    env: 'PORT',
    default: 4000
  },
  SALT: {
    doc: 'Salt for password hash',
    format: String,
    env: 'SALT',
    default: null
  },
  DB_HOST: {
    doc: 'IP address DB server (Mnd)',
    format: 'ipaddress',
    env: 'DB_HOST',
    default: '127.0.0.1'
  },
  DB_USER: {
    doc: 'User name to connect DB',
    format: String,
    env: 'DB_USER',
    default: null
  },
  DB_PASSWORD: {
    doc: 'User password to connect DB',
    format: String,
    env: 'DB_PASSWORD',
    default: null
  },
  DB_PORT: {
    doc: 'Port to connect DB',
    format: String,
    env: 'DB_PORT',
    default: '27017'
  },
  DB_NAME: {
    doc: 'Name of DB',
    format: String,
    env: 'DB_NAME',
    default: null
  }
});
