export const API_URL = 'https://appapi.palpalapp.com';

export const BASE_HEADERS = {
  'Accept-Encoding': 'gzip',
  adolescent_mode: 'false',
  app_bundle_id: 'com.imback.yeetalk',
  app_model: '24117RN76O',
  app_os_type: 'android',
  app_os_version: '16',
  app_version: '2.50.0',
  app_version_code: '1799',
  channel: 'google',
  Connection: 'keep-alive',
  local: 'en',
  'Content-Type': 'application/json;charset=utf-8',
  device_lang: 'en',
  Host: 'appapi.palpalapp.com',
  is_vpn: 'false',
  oaid: '',
  'User-Agent': 'okhttp/5.0.0-alpha.14',
};

export const AES_KEY = Buffer.from('e7894a32f6b84d02cb35b3dbb0a68b58', 'ascii');
export const AES_IV = Buffer.from('00000000000000000000000000000000', 'hex');
export const SIGN_FIELDS = [
  'request_id',
  'app_bundle_id',
  'app_device_id',
  'app_version',
  'app_model',
  'app_os_type',
  'app_os_version',
  'timestamp',
  'uuid',
  'is_vpn',
];
