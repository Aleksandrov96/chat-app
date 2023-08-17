import { AuthResponse } from 'interfaces/AuthResponse';
import { IUser } from 'interfaces/IUser';
import { makeAutoObservable } from 'mobx';
import { AuthService } from 'services/auth-service';

export default class AuthStore {
  user = {} as IUser;

  isAuth = false;

  isLoading = false;

  constructor() {
    makeAutoObservable(this);
  }

  setAuth(bool: boolean): void {
    this.isAuth = bool;
  }

  setUser(user: IUser): void {
    this.user = user;
  }

  setLoading(bool: boolean): void {
    this.isLoading = bool;
  }

  async signIn(email: string, password: string): Promise<void> {
    const data = await AuthService.signIn(email, password);
    if (data !== null) {
      localStorage.setItem('token', data.accessToken);
      this.setAuth(true);
      this.setUser(data.user);
    }
  }

  async signUp(email: string, password: string): Promise<AuthResponse | null> {
    const data = await AuthService.signUp(email, password);
    if (data !== null) {
      localStorage.setItem('token', data.accessToken);
      this.setAuth(true);
      this.setUser(data.user);
    }
    return data;
  }

  async signOut(): Promise<void> {
    await AuthService.signOut();
    localStorage.removeItem('token');
    this.setAuth(false);
    this.setUser({} as IUser);
  }

  async checkAuth(): Promise<void> {
    this.setLoading(true);
    const data = await AuthService.checkAuth();
    try {
      if (data !== null) {
        localStorage.setItem('token', data.accessToken);
        this.setAuth(true);
        this.setUser(data.user);
      }
    } finally {
      this.setLoading(false);
    }
  }
}
