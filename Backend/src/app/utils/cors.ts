import config from '../config';

export const allowedOrigins = config.client_url
  ? config.client_url.split(',')
  : [];
