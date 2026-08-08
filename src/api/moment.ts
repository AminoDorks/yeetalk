import {
  GetCommentsResponseSchema,
  type GetCommentsResponse,
  type GetMomentsResponse,
} from '../dto/moment';
import type { Http } from '../client/http';
import type { User } from '../entities';
import type { Comment } from '../entities/comment';

export class MomentAPI {
  private http: Http;
  private account: User;

  constructor(http: Http, account: User) {
    this.http = http;
    this.account = account;
  }

  public many = async (page: number = 1, batch: number = 20): Promise<GetMomentsResponse> =>
    await this.http.service<GetMomentsResponse>({
      data: JSON.stringify({ paging_request: { page_index: page, page_size: batch } }),
      interface: 'v2.momentService.MomentFlow',
      service: 'MomentService',
    });

  public comments = async (momentId: number, lastCommentId: number = 0): Promise<Comment[]> => {
    const comments = (
      await this.http.service<GetCommentsResponse>(
        {
          data: JSON.stringify({ moment_id: momentId, last_comment_id: lastCommentId }),
          interface: 'v2.momentService.GetCommentList',
          service: 'MomentService',
        },
        GetCommentsResponseSchema
      )
    ).comments;

    return comments?.flatMap((wrapped) => wrapped.rootComment) ?? [];
  };

  // TODO: solve the Network service busy error
  public comment = async (momentId: number, text: string): Promise<void> => {
    await this.http.service({
      data: JSON.stringify({
        comment: {
          create_time: Math.floor(Date.now() / 1000),
          id: 0,
          moment_id: momentId,
          reply_comment_id: 0,
          root_comment_id: 0,
          type: 4,
          text,
          user: {
            identity: this.account.identity,
          },
        },
      }),
      interface: 'v1.momentService.PublishComment',
      service: 'MomentService',
    });
  };
}
