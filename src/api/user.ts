import type { Http } from '../client/http';
import {
  type GetUserResponse,
  GetUserResponseSchema,
  type SearchSpeakersResponse,
  SearchSpeakersResponseSchema,
} from '../dto/user';
import type { UpdateBuilder } from '../types/usable';

export class UserAPI {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public following = async (identity: string, status: 1 | -1): Promise<void> =>
    await this.http.service({
      data: JSON.stringify({ identity, status }),
      interface: 'v1.UserService.Follow',
      service: 'UserService',
    });

  public get = async (identity: string): Promise<GetUserResponse> =>
    await this.http.service<GetUserResponse>(
      {
        data: JSON.stringify({ identity }),
        interface: 'v4.User.GetInfo',
        service: 'UnifyEntry',
      },
      GetUserResponseSchema
    );

  public update = async (builder: UpdateBuilder): Promise<void> => {
    await this.http.service({
      data: JSON.stringify({
        ...builder,
        head_id: builder.headId,
        hobbes: builder.hobbies?.map((id) => ({ id })),
        country: builder.countryId ? { id: builder.countryId } : undefined,
      }),
      interface: 'v1.UserService.UpdateInfo',
      service: 'UserService',
    });
  };

  public speakers = async (page: number = 1, batch: number = 20): Promise<SearchSpeakersResponse> =>
    await this.http.service<SearchSpeakersResponse>(
      {
        data: JSON.stringify({
          paging_request: { page_index: page, page_size: batch },
          online: -1,
          talk_status: 0,
          gender: -1,
          min_age: 12,
          max_age: 60,
          native: [0],
          skilled_language_id: [0],
          learn_language_id: [0],
          max_learn_practised: 5,
          min_learn_practised: 1,
          nearby: 0,
          local_user_num: 18,
        }),
        interface: 'v4.User.FuzzySearch',
        service: 'UnifyEntry',
      },
      SearchSpeakersResponseSchema
    );

  public follow = async (identity: string): Promise<void> => await this.following(identity, 1);

  public unfollow = async (identity: string): Promise<void> => await this.following(identity, -1);
}
