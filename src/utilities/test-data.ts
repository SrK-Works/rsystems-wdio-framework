import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';

/** Load a JSON data file from data/json-files (data-driven testing). */
export function loadJson<T = any>(name: string): T {
  return JSON.parse(readFileSync(resolve('data/json-files', name), 'utf8')) as T;
}
