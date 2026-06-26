import type { Http } from '../client/http';
import {
  type GetAudienceResponse,
  GetAudienceResponseSchema,
  type GetMessagesResponse,
  GetMessagesResponseSchema,
  type GetRoomsResponse,
  GetRoomsResponseSchema,
  type GetTagsResponse,
  GetTagsResponseSchema,
  type JoinRoomResponse,
  JoinRoomResponseSchema,
} from '../dto/room';
import type { Member } from '../entities/member';
import type { Message } from '../entities/message';
import type { Room } from '../entities/room';
import type { Tag } from '../entities/tag';

export class RoomAPI {
  private http: Http;

  constructor(http: Http) {
    this.http = http;
  }

  public tags = async (): Promise<Tag[]> =>
    (
      await this.http.service<GetTagsResponse>(
        {
          data: JSON.stringify({}),
          interface: 'Room.tag',
          service: 'UnifyEntry',
        },
        GetTagsResponseSchema
      )
    ).list;

  public many = async (tag: number = 0): Promise<Room[]> =>
    (
      await this.http.service<GetRoomsResponse>(
        {
          data: JSON.stringify({ tag, permission: 1, rooms: [], support_sdk: [0, 2] }),
          interface: 'V5.Room.List',
          service: 'UnifyEntry',
        },
        GetRoomsResponseSchema
      )
    ).rooms;

  public join = async (roomId: string): Promise<JoinRoomResponse> =>
    await this.http.service<JoinRoomResponse>(
      {
        data: JSON.stringify({
          room_id: roomId,
          support_sdk: [0, 2],
          join_type: 0,
          join_source: 'RoomHomeList_1',
        }),
        interface: 'v2.RoomService.JoinRoom',
        service: 'UnifyEntry',
      },
      JoinRoomResponseSchema
    );

  public leave = async (roomId: string): Promise<void> =>
    await this.http.service({
      data: JSON.stringify({ room_id: roomId }),
      interface: 'v2.RoomService.LeaveRoom',
      service: 'RoomServiceV2',
    });

  public messages = async (roomId: string): Promise<Message[]> =>
    (
      await this.http.service<GetMessagesResponse>(
        {
          data: JSON.stringify({ room_id: roomId }),
          interface: 'Room.HistoryMsg',
          service: 'RoomServiceV2',
        },
        GetMessagesResponseSchema
      )
    ).msgs;

  public audience = async (roomId: string): Promise<Member[]> =>
    (
      await this.http.service<GetAudienceResponse>(
        {
          data: JSON.stringify({ room_id: roomId }),
          interface: 'v2.RoomServiceV2.MemberList',
          service: 'UnifyEntry',
        },
        GetAudienceResponseSchema
      )
    ).audience;
}
