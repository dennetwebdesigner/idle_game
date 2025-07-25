import createUser from '../../services/Users/create';
import { emit, on, RESPONSE_SOCKET } from '../../utils/socket_methods';

function register_user(
  flag_request: string,
  data: { flag: string; data: Record<string, any> },
) {
  on(data, async ({ flag, data }) => {
    if (flag_request != flag) return;

    try {
      const user = (await createUser.execute(data as any)) as any;
      delete user.password;
      console.log(user);

      emit('registered', {
        id: data.id,
        status: 201,
        message: 'Conta cadastrada com sucesso, faça o login!',
      });
    } catch (error) {
      console.log(error);
    }
  });
}

export function _register_user(require: RESPONSE_SOCKET) {
  register_user('registering', require);
}
