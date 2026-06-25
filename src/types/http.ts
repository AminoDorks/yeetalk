import type { InterfaceAPI, ServiceAPI } from './api';

export interface ServiceBuilder {
  data: string;
  interface: InterfaceAPI;
  service: ServiceAPI;
}

export type Headers = Record<string, string>;
