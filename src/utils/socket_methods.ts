import { all_session_server, get_session_conn } from '../servers/SESSIONS';

export type RESPONSE_SOCKET = {
  flag: string;
  data: Record<string, any>;
};

export async function broadcast(flag: string, data: Record<string, any>) {
  for (const key in all_session_server()) {
    emit(flag, { ...data, id: key });
  }
}

export async function on(
  data: { flag: string; data: Record<string, any> },
  callback: (data: { flag: string; data: Record<string, any> }) => void,
) {
  callback(data);
}

export async function emit(flag: string, data: Record<string, any>) {
  console.log('sessions conn ', data);
  get_session_conn(data.id).send(JSON.stringify({ flag, response: data }));
}
