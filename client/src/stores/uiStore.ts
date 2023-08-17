import { makeAutoObservable } from 'mobx';

export default class UIStore {
  locale = 'en-US';

  theme = 'light';

  constructor() {
    makeAutoObservable(this);
  }

  setLocale(value: string): void {
    this.locale = value;
  }

  setTheme(value: string): void {
    this.theme = value;
    localStorage.setItem('theme', value);
  }
}
