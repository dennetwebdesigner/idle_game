import { v4 as uuid } from 'uuid';
import { WebSocket } from 'ws';

import { get_session_server, set_session_server } from '../../servers/SESSIONS';
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
) {
  on(data, ({ flag, data }) => {
    if (flag_request != flag) return;
    const session = get_session_server(data.id);
    broadcast('get_message', {
      username: 'SERVIDOR',
      message: `${data.username} entrou no jogo`,
    });

    session.username = data.username;
    session.email = data.email;

    emit('logged', {
      id: data.id,
      mensagem: 'dados cadastrados!',
      email: data.email,
      username: data.username,
    });

    console.log(data.id, ' adicionou um username \n', data.username);
  });
}

export function _set_user(require: RESPONSE_SOCKET) {
  set_user('logging', require);
}
