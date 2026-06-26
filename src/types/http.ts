import type { InterfaceAPI, ServiceAPI } from './api';
import type { FileType } from './usable';

export interface ServiceBuilder {
  data: string;
  interface: InterfaceAPI;
  service: ServiceAPI;
}

export interface MultipartBuilder {
  fileSecret: string;
  type: FileType;
  arrayBuffer: ArrayBuffer;
}

export type Headers = Record<string, string>;
