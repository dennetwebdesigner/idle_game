import { Server } from 'http';
import WebSocket from 'ws';

import { broadcast, emit, on } from '../utils/socket_methods';
import { _get_mensage_chat } from './chat_online/send_message';
import { _disconnet_player } from './connections/_disconnect_player';
import { _new_session, _set_user } from './connections/_new_player';

export const wss = new WebSocket.Server({ noServer: true });
const SESSIONS: Record<string, Record<string, any>> = {};

export function server_init(server: Server) {
  // Lida com conexões WebSocket
  wss.on('connection', (socket) => {
    const id = _new_session(socket);

    socket.on('message', (message) => {
      const response = JSON.parse(message.toString());
      if (!('flag' in response) || !('data' in response)) return;

      _set_user(response);
      //CHAT ONLINE
      _get_mensage_chat(response);
    });

    socket.on('close', () => {
      console.log('🔌 Cliente WS desconectado');
      _disconnet_player({ id });
    });
  });

  // Faz o upgrade manual e aceita qualquer origem
  server.on('upgrade', (req, socket, head) => {
    console.log('🔄 Upgrade solicitado');

    // Aqui você pode checar o origin se quiser
    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit('connection', ws, req); // Emite uma nova conexão com o cliente
    });
  });
}
