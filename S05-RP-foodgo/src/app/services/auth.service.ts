import { Injectable } from '@angular/core';

export interface User {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly validEmail = 'admin@foodgo.com';
  private readonly validPassword = 'admin123';

  login(email: string, password: string): boolean {

    const valid =
      email.trim().toLowerCase() === this.validEmail &&
      password === this.validPassword;

    if (!valid) {
      return false;
    }

    const user: User = {
      name: 'Admin',
      email: this.validEmail,
      role: 'admin'
    };

    localStorage.setItem(
      'user',
      JSON.stringify(user)
    );

    return true;
  }

  logout(): void {
    localStorage.removeItem('user');
  }

  getUser(): User | null {

    const storedUser =
      localStorage.getItem('user');

    if (!storedUser) {
      return null;
    }

    try {
      return JSON.parse(storedUser) as User;
    } catch {
      return null;
    }
  }

  isLoggedIn(): boolean {
    return this.getUser() !== null;
  }
}
