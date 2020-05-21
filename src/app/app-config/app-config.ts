export const A_CONFIG_URL = '/assets/config/app-config.json';

export interface A_CONFIG {
  production: boolean;
  apiBaseUrl: string;
}

export const appConfig: A_CONFIG = {
  production: false,
  apiBaseUrl: null
};