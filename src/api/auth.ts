import type { Http } from '../client/http';
import { type GetMeResponse, GetMeResponseSchema } from '../dto/auth';

export class AuthAPI {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public me = async () =>
    await this.http.service<GetMeResponse>(
      {
        data: JSON.stringify({}),
        interface: 'v4.User.MyPanel',
        service: 'UnifyEntry',
      },
      GetMeResponseSchema
    );

  public login = async (accessToken: string, identity: string) => {
    this.http.headers = {
      access_token: accessToken,
      identity: identity,
    };
  };
}
