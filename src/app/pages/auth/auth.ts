import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private role: 'admin' | 'user' | null = null;

  private loggedIn = new BehaviorSubject<boolean>(false);
  private admin = new BehaviorSubject<boolean>(false);

  isLoggedIn$ = this.loggedIn.asObservable();
  isAdmin$ = this.admin.asObservable();

  login(userRole: 'admin' | 'user'): void {
    this.role = userRole;
    this.loggedIn.next(true);
    this.admin.next(userRole === 'admin');
  }

  logout(): void {
    this.role = null;
    this.loggedIn.next(false);
    this.admin.next(false);
  }

  getRole(): 'admin' | 'user' | null {
    return this.role;
  }

  isAdmin(): boolean {
    return this.role === 'admin';
  }

  isUser(): boolean {
    return this.role === 'user';
  }
}
