import { environment } from 'src/environments/environment.development';

export const API_URL = environment.apiUrl;
export const DATA_URL = environment.dataUrl;
export const AUDIT_URL = environment.auditUrl;
export const TAG_URL = environment.tagUrl;

export const COOKIE_KEYS = {
  TOKEN: 'token',
  EXPIRATION: 'expiration',
  IAT: 'iat',
  SUB: 'sub',
  ROLES: 'roles'
};

export const LOCAL_STORAGE_KEYS = {
  LANGUAGE: 'language'
};
