import type { InterfaceAPI, ServiceAPI } from './api';

export interface ServiceBuilder {
  data: string;
  interface: InterfaceAPI;
  service: ServiceAPI;
}

export interface MultipartBuilder {
  fileSecret: string;
  arrayBuffer: ArrayBuffer;
}

export type Headers = Record<string, string>;
