import { generateRandomValue } from './generate-common.js';
import { fileURLToPath } from 'node:url';
import { dirname } from 'node:path';

export function getRandomItems<T>(items: T[]): T[] {
  const startPosition = generateRandomValue(0, items.length - 1);
  const endPosition =
    startPosition + generateRandomValue(startPosition, items.length);
  return items.slice(startPosition, endPosition);
}

export function getRandomItem<T>(items: T[]): T {
  return items[generateRandomValue(0, items.length - 1)];
}

export function getErrorMessage(error: unknown): string {
  return error instanceof Error ? error.message : '';
}

export function getCurrentModuleDirectoryPath(){
  const filepath = fileURLToPath(import.meta.url);
  return dirname(filepath);
}

export function getMongoURI(
  username: string,
  password: string,
  host: string,
  port: string,
  databaseName: string,
){
  return `mongodb://${username}:${password}@${host}:${port}/${databaseName}?authSource=admin`;
}
