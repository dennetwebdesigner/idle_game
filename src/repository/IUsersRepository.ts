type tempDTO = {
  username: string;
  email: string;
  password: string;
};

type tempCreatedDTO = {
  id?: string;
};

type tempFindDTO = {
  id: string;
  username: string;
  email: string;
  password: string;
};

export interface iUsersRepository {
  store(data: tempDTO): Promise<tempCreatedDTO>;
  find(data: Record<string, any>): Promise<tempFindDTO>;
}
