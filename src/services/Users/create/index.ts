import { database } from '../../../database/dbClient';
import { UsersRepository } from '../../../repository/implements/UsersRepostiry';
import { createUserService } from './createUserService';

const repository = new UsersRepository(database);
const createUser = new createUserService(repository);

export default createUser;
