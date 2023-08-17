import axios, { AxiosError } from 'axios';
import { AuthResponse } from 'interfaces/AuthResponse';
import { setToastError } from 'utils/setToastError';
import $api from '../api/index';

export class AuthService {
  static signUp = async (
    email: string,
    password: string,
  ): Promise<AuthResponse | null> => {
    try {
      const { data } = await $api.post<AuthResponse>('/sign-up', { email, password });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
      return null;
    }
  };

  static signIn = async (
    email: string,
    password: string,
  ): Promise<AuthResponse | null> => {
    try {
      const { data } = await $api.post<AuthResponse>('/sign-in', { email, password });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
      return null;
    }
  };

  static signOut = async (): Promise<void> => {
    try {
      await $api.post('/sign-out');
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
    }
  };

  static checkAuth = async (): Promise<AuthResponse | null> => {
    try {
      const { data } = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/refresh`, { withCredentials: true });
      return data;
    } catch (e) {
      if (e instanceof AxiosError) {
        setToastError(e.response?.data.message as string);
      }
      return null;
    }
  };
}
