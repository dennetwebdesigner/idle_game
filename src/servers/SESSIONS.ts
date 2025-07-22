const SESSIONS: Record<string, Record<string, any>> = {};

export function all_session_server() {
  return SESSIONS;
}

export function get_session_server(id: string) {
  return SESSIONS[id];
}

export function get_session_conn(id: string) {
  return SESSIONS[id].conn;
}

export function set_session_server(id: string, data: Record<string, any>) {
  SESSIONS[id] = { ...SESSIONS[id], ...data };
}

export function remove_session(id: string) {
  delete SESSIONS[id];
}
