import validator from 'validator';

import { set_hash } from '../../../config/ps_hc';
import { iUsersRepository } from '../../../repository/IUsersRepository';
import { createUserDTO } from './createUserDTO';

export class createUserService {
  private repository: iUsersRepository;
  constructor(reposiotory: iUsersRepository) {
    this.repository = reposiotory;
  }

  async execute(data: createUserDTO) {
    const { username, password, email } = data;

    if (
      !('username' in data) ||
      !('password' in data) ||
      !('email' in data || !username || !password || !email)
    ) {
      throw {
        status: 400,
        message: 'Todos os campos precisam estar preenchidos!',
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
    } else if (!validator.isEmail(email)) {
      throw {
        status: 400,
        message: 'E-mail inválido',
      };
    }

    const hash_password = set_hash(password);

    const user = await this.repository.store({
      ...data,
      password: hash_password,
    });

    if (!('id' in user))
      throw {
        status: 500,
        message: 'Ocorreu algum erro, reinicie o jogo e tente novamente!',
      };

    return user;
  }
}
