import { WebSocket } from 'ws';

import { get_session_server } from '../../servers/SESSIONS';
import { broadcast, on, RESPONSE_SOCKET } from '../../utils/socket_methods';

export function _get_mensage_chat(request: RESPONSE_SOCKET) {
  get_mensage_chat('enviar_mensagem_chat', request);
}

function get_mensage_chat(
  flag: string,
  request: { flag: string; data: Record<string, any> },
) {
  on(request, ({ flag: flag_req, data }) => {
    if (flag_req != flag) return;

    broadcast('get_message', {
      username: get_session_server(data.id).username,
      message: data.chat_enviar,
    });
  });
}
