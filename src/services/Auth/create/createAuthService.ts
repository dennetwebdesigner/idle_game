import { get_hash } from '../../../config/ps_hc';
import { iUsersRepository } from '../../../repository/IUsersRepository';
import { createTokenService } from '../../Token/createTokenService';
import { createAuthDTO } from './createAuthDTO';

export class CreateAuthService {
  private repository: iUsersRepository;
  constructor(repository: iUsersRepository) {
    this.repository = repository;
  }

  async execute(data: createAuthDTO) {
    const { username, password } = data;
    if (
      !('username' in data) ||
      !('password' in data) ||
      !username ||
      !password
    ) {
      throw {
        status: 400,
        message: 'auth Todos os campos precisam estar preenchidos!',
      };
    } else if (username.length < 4 || username.length > 24) {
      throw {
        status: 400,
        message: 'Nome de usuário tem que entre 4 e 24 letras!',
      };
    } else if (password.length < 8 || password.length > 64) {
      throw {
        status: 400,
        message: 'Senha tem que entre 8 e 64 letras! ',
      };
    }

    const user = await this.repository.find({ username });
    if (!user || !('username' in user) || !user.username)
      throw {
        status: 401,
        message: 'Dados invalidos, tente novamente!',
      };

    const compare = await get_hash({ t: password, h: user.password });
    console.log(compare);
    if (!compare)
      throw {
        status: 401,
        message: 'Dados invalidos, tente novamente!',
      };

    const token = await createTokenService({ id: user.id });
    return { token, id: user.id };
  }
}
