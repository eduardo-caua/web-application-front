import { Environment } from '../../../environment';
import { API } from '../axios-config';

export interface IUsersList {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
}

export interface IUser {
  id: string;
  name: string;
  email: string;
  password?: string;
  phone?: string;
}

type TUserData = {
  rows: IUsersList[];
  count: number;
}

const getAll = async (page = 1, filter = ''): Promise<TUserData | Error> => {
  try {
    const offset = page === 1 ? page-1 : (page-1)*Environment.PAGE_SIZE;

    const urlRelativa = `/users?_offset=${offset}&_limit=${Environment.PAGE_SIZE}&name=${filter}`;

    const { data } = await API.get(urlRelativa);

    if (data) {
      return data;
    }

    return new Error('Unexpected error on query. Try again later.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Unexpected error on query. Try again later.');
  }
};

const getById = async (id: string): Promise<IUser | Error> => {
  try {
    const { data } = await API.get(`/users/${id}`);

    if (data) {
      return data;
    }

    return new Error('Unexpected error on query. Try again later.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Unexpected error on query. Try again later.');
  }
};

const create = async (req: Omit<IUser, 'id'>): Promise<string | Error> => {
  try {
    const { data } = await API.post<IUser>('/users', req);

    if (data) {
      return data.id;
    }

    return new Error('Unexpected error on create. Try again later.');
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Unexpected error on create. Try again later.');
  }
};

const updateById = async (id: string, req: IUser): Promise<void | Error> => {
  try {
    await API.put(`/users/${id}`, req);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Unexpected error on update. Try again later.');
  }
};

const deleteById = async (id: string): Promise<void | Error> => {
  try {
    await API.delete(`/users/${id}`);
  } catch (error) {
    console.error(error);
    return new Error((error as { message: string }).message || 'Unexpected error on delete. Try again later.');
  }
};

export const UsersService = {
  getAll,
  create,
  getById,
  updateById,
  deleteById,
};
