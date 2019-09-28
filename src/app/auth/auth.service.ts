import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from './user.model';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

interface ResData {
  email: string;
  username: string;
  id: string;
  token: string;
}
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user = new BehaviorSubject<User>(null);

  constructor(private http: HttpClient) {}
  autoLogin() {
    if (!!localStorage.getItem('user')) {
      const userData: ResData = JSON.parse(localStorage.getItem('user'));
      const storedUser = new User(
        userData.email,
        userData.username,
        userData.id,
        userData.token
      );
      this.user.next(storedUser);
    }
  }

  onSignup(signupData: {
    name: string;
    email: string;
    username: string;
    password: string;
  }) {
    return this.http.post('http://localhost:5000/user/register', signupData);
  }

  onLogin(loginData: { email: string; password: string }) {
    return this.http.post('http://localhost:5000/user/login', loginData).pipe(
      tap((resData: ResData) => {
        const user = new User(
          resData.email,
          resData.username,
          resData.id,
          resData.token
        );
        localStorage.setItem('user', JSON.stringify(resData));
        this.user.next(user);
      })
    );
  }
  resetEmail(email: string) {
    return this.http.post('http://localhost:5000/user/resetpassword', {
      email
    });
  }
}
