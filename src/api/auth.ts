import type { Http } from '../client/http';
import {
  type GetMeResponse,
  GetMeResponseSchema,
  type RegisterResponse,
  RegisterResponseSchema,
} from '../dto/auth';
import type { User } from '../entities';

export class AuthAPI {
  private http: Http;
  private _account?: User;

  constructor(http: Http) {
    this.http = http;
  }

  get account(): User {
    if (!this._account) {
      throw new Error('Unauthorized');
    }
    return this._account;
  }

  public me = async (): Promise<GetMeResponse> =>
    await this.http.service<GetMeResponse>(
      {
        data: JSON.stringify({}),
        interface: 'v4.User.MyPanel',
        service: 'UnifyEntry',
      },
      GetMeResponseSchema
    );

  public login = async (accessToken: string, identity: string): Promise<void> => {
    this.http.headers = {
      access_token: accessToken,
      identity: identity,
    };

    this._account = (await this.me()).userInfo.user;
  };

  public sendCode = async (email: string): Promise<void> => {
    await this.http.service({
      data: JSON.stringify({ email, code_type: 1 }),
      interface: 'v1.emailService.sendVerifyCode',
      service: 'UnifyEntry',
    });
  };

  public register = async (email: string, code: string): Promise<RegisterResponse> =>
    await this.http.service<RegisterResponse>(
      {
        data: JSON.stringify({ email, verification_code: code, login_type: 10 }),
        interface: 'v3.UserService.Login',
        service: 'UserService',
      },
      RegisterResponseSchema
    );
}
