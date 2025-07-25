import { database } from '../../../database/dbClient';
import { UsersRepository } from '../../../repository/implements/UsersRepostiry';
import { CreateAuthService } from './createAuthService';

const repository = new UsersRepository(database);
export const createAuthService = new CreateAuthService(repository);
