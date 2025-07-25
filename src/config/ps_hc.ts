import bcrypt from 'bcrypt';

export function set_hash(data: string) {
  return bcrypt.hashSync(data + 'por enquanto qualquer coisa', 10);
}

export async function get_hash(data: { t: string; h: string }) {
  return bcrypt.compareSync(data.t + 'por enquanto qualquer coisa', data.h);
}
