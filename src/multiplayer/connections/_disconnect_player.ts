import { get_session_server, remove_session } from '../../servers/SESSIONS';
import { broadcast } from '../../utils/socket_methods';

export function _disconnet_player(data: Record<string, any>) {
  const player = JSON.parse(JSON.stringify(get_session_server(data.id)));

  remove_session(data.id);

  broadcast('get_message', {
    username: 'SERVIDOR',
    message: `${player.username} saiu do jogo`,
  });
}
