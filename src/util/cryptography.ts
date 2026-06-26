import { createCipheriv, createDecipheriv, randomUUID } from 'crypto';
import { gunzipSync, inflateSync, CryptoHasher } from 'bun';

import { AES_KEY, AES_IV, SIGN_FIELDS } from '../constants';
import type { DecodedUserSig } from '../types/cryptography';
import type { Headers } from '../types/http';

export const encrypt = (body: string): string => {
  const cipher = createCipheriv('aes-256-cbc', AES_KEY, AES_IV);
  return `${cipher.update(body, 'utf8', 'hex')}${cipher.final('hex')}`;
};

export const decryptBody = (body: string): string => {
  const decipher = createDecipheriv('aes-256-cbc', AES_KEY, AES_IV);
  return `${decipher.update(body, 'hex')}${decipher.final('ascii')}`;
};

export const decrypt = (response: string): string => {
  const decipher = createDecipheriv('aes-256-cbc', AES_KEY, AES_IV);

  return Buffer.from(
    gunzipSync(Buffer.concat([decipher.update(response.trim(), 'hex'), decipher.final()]))
  ).toString('utf-8');
};

export const decodeUserSig = (userSig: string): DecodedUserSig =>
  JSON.parse(
    Buffer.from(inflateSync(Buffer.from(userSig, 'base64'), { windowBits: 15 })).toString('utf-8')
  );

export const generateRequestId = (): string => `${Date.now()}${Math.floor(Math.random() * 10000)}`;

export const generateSign = (headers: Headers) => {
  const paramsForSign = SIGN_FIELDS.filter((key) => headers[key])
    .map((key) => `${key}=${encodeURIComponent(headers[key]!)}`)
    .join('&');

  return new CryptoHasher('md5')
    .update(`${paramsForSign}${headers['timestamp']!.split('').reverse().join('')}`)
    .digest('hex');
};

export const generateDeviceId = (): string => `${randomUUID().replace(/-/g, '').slice(0, 33)}e`;
