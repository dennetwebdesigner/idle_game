import jsonwebtoken from 'jsonwebtoken';
import { promisify } from 'util';

import { config_s } from '../../config/config_s';

export async function createTokenService(data: { id: string }) {
  const token = await promisify<
    Record<string, any>,
    string,
    Record<string, any>
  >(jsonwebtoken.sign)(data, config_s.secret, {
    expiresIn: config_s.expires,
  });
  return token;
}
