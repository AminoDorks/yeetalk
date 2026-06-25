import { AuthAPI } from '../api/auth';
import type { YeetalkConfig } from '../types/common';
import { configureLogger } from '../util/logger';
import { Http } from './http';

export class Yeetalk {
  private http: Http;

  private authApi?: AuthAPI;

  constructor(config: YeetalkConfig = {}) {
    this.http = new Http(configureLogger(!!config.enableLogging));
  }

  set proxy(value: string | undefined) {
    this.http.proxy = value;
  }

  get auth(): AuthAPI {
    if (!this.authApi) {
      this.authApi = new AuthAPI(this.http);
    }
    return this.authApi;
  }
}
