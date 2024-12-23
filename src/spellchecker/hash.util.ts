import * as crypto from 'crypto';

export function createSha256Hash(...inputs: string[]): string {
  const hash = crypto.createHash('sha256');
  inputs.forEach((i) => hash.update(i));
  return hash.digest('hex');
}
