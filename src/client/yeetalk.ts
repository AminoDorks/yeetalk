import { file, CryptoHasher } from 'bun';

import { AuthAPI } from '../api/auth';
import { UserAPI } from '../api/user';
import { RoomAPI } from '../api/room';
import { MomentAPI } from '../api/moment';
import { configureLogger } from '../util/logger';
import { Http } from './http';
import { FileType } from '../types/usable';
import {
  GetCountriesResponseSchema,
  GetHobbiesResponseSchema,
  UploadResponseSchema,
  type GetCountriesResponse,
  type GetHobbiesResponse,
  type UploadResponse,
} from '../dto/common';
import type { Country, Hobby, User } from '../entities';
import type { YeetalkConfig } from '../types/common';

export class Yeetalk {
  private http: Http;

  private authApi?: AuthAPI;
  private userApi?: UserAPI;
  private roomApi?: RoomAPI;
  private momentApi?: MomentAPI;

  constructor(config: YeetalkConfig = {}) {
    this.http = new Http(configureLogger(!!config.enableLogging));
  }

  set proxy(value: string | undefined) {
    this.http.proxy = value;
  }

  get account(): User {
    if (!this.authApi) {
      throw new Error('Unauthorized');
    }
    return this.authApi.account;
  }

  get auth(): AuthAPI {
    if (!this.authApi) {
      this.authApi = new AuthAPI(this.http);
    }
    return this.authApi;
  }

  get user(): UserAPI {
    if (!this.userApi) {
      this.userApi = new UserAPI(this.http);
    }
    return this.userApi;
  }

  get room(): RoomAPI {
    if (!this.roomApi) {
      this.roomApi = new RoomAPI(this.http);
    }
    return this.roomApi;
  }

  get moment(): MomentAPI {
    if (!this.momentApi) {
      this.momentApi = new MomentAPI(this.http, this.account);
    }
    return this.momentApi;
  }

  public upload = async (
    path: string,
    type: FileType = FileType.Image
  ): Promise<UploadResponse> => {
    const arrayBuffer = await file(path).arrayBuffer();

    const fileSecret = await this.http.secret(
      new CryptoHasher('md5').update(arrayBuffer).digest('hex').toUpperCase()
    );

    return await this.http.multipart<UploadResponse>(
      { fileSecret, arrayBuffer, type },
      UploadResponseSchema
    );
  };

  public hobbies = async (): Promise<Hobby[]> =>
    (
      await this.http.service<GetHobbiesResponse>(
        {
          data: JSON.stringify({}),
          interface: 'v1.ConfigService.Hobby',
          service: 'ConfigService',
        },
        GetHobbiesResponseSchema
      )
    ).list;

  public countries = async (): Promise<Country[]> =>
    (
      await this.http.service<GetCountriesResponse>(
        {
          data: JSON.stringify({ type: 1 }),
          interface: 'v1.ConfigService.Country',
          service: 'ConfigService',
        },
        GetCountriesResponseSchema
      )
    ).list.flatMap((listBatch) => listBatch.list);

  public healthcheck = async (): Promise<boolean> => await this.http.healthcheck();
}
