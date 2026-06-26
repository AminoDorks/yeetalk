export interface UpdateBuilder {
  nickname?: string;
  introduce?: string;
  birthday?: string;
  headId?: number;
  hobbies?: Array<number>;
  countryId?: number;
}

export enum FileType {
  Video = '1',
  Voice = '2',
  Image = '3',
  Log = '4',
}
