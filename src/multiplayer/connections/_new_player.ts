import { v4 as uuid } from 'uuid';
import { WebSocket } from 'ws';

import {
  all_session_server,
  get_session_server,
  set_session_server,
} from '../../servers/SESSIONS';
import { createAuthService } from '../../services/Auth/create';
import {
  broadcast,
  emit,
  on,
  RESPONSE_SOCKET,
} from '../../utils/socket_methods';

export function _new_session(conn: WebSocket) {
  const id = uuid();
  set_session_server(id, {
    conn,
    id,
    username: '',
  });

  console.log('Nova jogador conectado criada \n', id);
  emit('get_my_id', { id });
  return id;
}

function set_user(
  flag_request: string,
  data: { flag: string; data: Record<string, any> },
  c_id: Function,
) {
  on(data, async ({ flag, data }) => {
    if (flag_request != flag) return;

    broadcast('get_message', {
      username: 'SERVIDOR',
      message: `${data.username} entrou no jogo`,
    });

    try {
      const user = await createAuthService.execute(data as any);
      const session = get_session_server(data.id);
      c_id(user.id);

      session.username = data.username;

      set_session_server(user.id, { ...session, id: user.id });
      const all_players = all_session_server();
      delete all_players[data.id];

      const d = Object.keys(all_players).reduce((acc: any, curr: string) => {
        return { ...acc, [curr]: { username: all_players[curr].username } };
      }, {});

      emit('logged', {
        id: user.id,
        mensagem: 'entrou',
        setup: d,
      });

      console.log('\n============\n');
      console.log(
        all_players[user.id].username,
        ' fez o login \n',
        data.username,
        d,
      );
      console.log('============\n');
    } catch (error: any) {
      console.log(error);

      if (!('message' in error) || !('status' in error))
        emit('logged', {
          id: data.id,
          message: 'Erro com o servidor',
          status: 401,
        });

      emit('logged', {
        id: data.id,
        message: error.message,
        status: error.status,
      });
    }
  });
}

export function _set_user(require: RESPONSE_SOCKET, c_id: Function) {
  set_user('logging', require, c_id);
}
