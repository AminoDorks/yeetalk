import { ZodType } from 'zod';
import type { Logger } from 'pino';
import { fetch } from 'netbun';
import camelcaseKeys from 'camelcase-keys';

import { isOk } from '../util/util';
import { API_URL, BASE_HEADERS } from '../constants';
import type { Headers, ServiceBuilder } from '../types/http';
import { YeetalkError } from '../util/errors';
import { CommonResponseSchema } from '../dto/common';
import {
  decrypt,
  encrypt,
  generateDeviceId,
  generateRequestId,
  generateSign,
} from '../util/cryptography';

export class Http {
  private _headers: Headers = { ...BASE_HEADERS };

  private logger: Logger;
  private _proxy?: string;

  constructor(logger: Logger, deviceId: string = generateDeviceId()) {
    this.logger = logger;
    this.headers = {
      app_device_id: deviceId,
      uuid: deviceId,
    };
  }

  set proxy(value: string | undefined) {
    this._proxy = value;
    this.logger.info({ proxy: this._proxy }, !!this._proxy ? 'proxy set' : 'proxy unset');
  }

  set headers(value: Headers) {
    this._headers = { ...this._headers, ...value };
  }

  get proxy(): string | undefined {
    return this._proxy;
  }

  get headers(): Headers {
    return this._headers;
  }

  private configureHeaders = (): Headers => {
    const headers = {
      timestamp: Math.floor(Date.now() / 1000).toString(),
      ...this._headers,
      request_id: generateRequestId(),
    };

    return {
      ...headers,
      sign: generateSign(headers),
    };
  };

  private handle = async <T>(path: string, encrypted: string, schema: ZodType<T>): Promise<T> => {
    const decrypted = camelcaseKeys(JSON.parse(decrypt(encrypted)), { deep: true });

    const commonResponse = CommonResponseSchema.parse(decrypted);

    if (!isOk(commonResponse.code)) {
      this.logger.error({ path }, commonResponse.message);
      throw new YeetalkError(commonResponse.message);
    }

    this.logger.info({ path: path }, 'OK');

    return schema.parse(decrypted.data);
  };

  public service = async <T>(builder: ServiceBuilder, schema: ZodType<T>): Promise<T> => {
    const response = await fetch(`${API_URL}/gateway/v4/service`, {
      method: 'POST',
      body: encrypt(JSON.stringify(builder)),
      headers: this.configureHeaders(),
      proxy: this._proxy,
    });

    return await this.handle(response.url, await response.text(), schema);
  };
}
