import { createCipheriv, createDecipheriv } from 'crypto';
import { gunzipSync } from 'bun';

import { AES_KEY, AES_IV } from '../constants';

export const encrypt = (body: string): string => {
  const cipher = createCipheriv('aes-256-cbc', AES_KEY, AES_IV);
  return cipher.update(body, 'utf8', 'hex') + cipher.final('hex');
};

export const decrypt = (response: string): string => {
  const decipher = createDecipheriv('aes-256-cbc', AES_KEY, AES_IV);

  return Buffer.from(
    gunzipSync(Buffer.concat([decipher.update(response.trim(), 'hex'), decipher.final()]))
  ).toString('utf-8');
};
