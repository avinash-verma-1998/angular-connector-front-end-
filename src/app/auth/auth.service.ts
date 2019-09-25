import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private http: HttpClient) {}
  onSignup(signupData: {
    name: string;
    email: string;
    username: string;
    password: string;
  }) {
    return this.http.post('http://localhost:5000/user/register', signupData);
  }
  onLogin(loginData: { email: string; passowrd: string }) {
    return this.http.post('http://localhost:5000/user/login', loginData);
  }
}
