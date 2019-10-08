import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';
import { ProfileService } from '../profile/profile.service';
interface Error {
  error?: any;
  email?: string;
  password?: string;
}

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('sf', { static: false }) signupForm: NgForm;
  @ViewChild('lf', { static: false }) loginForm: NgForm;
  Form: NgForm;
  loginMode = true;
  loading = false;
  emailLogin = '';
  error: Error = {};
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private route: Router
  ) {}
  ngOnDestroy() {
    this.error = {};
  }

  ngOnInit() {
    console.log(this.authService.user.pipe(take(1)));
  }
  onSignup() {
    if (this.signupForm.valid) {
      this.loading = true;
      this.authService.onSignup(this.signupForm.value).subscribe(
        res => {
          this.loading = false;
          this.loginMode = true;
        },
        err => {
          if (err.status === 0) {
            this.loginMode = true;
            this.loading = false;
          } else {
            this.error = err.error;
          }
        }
      );
    }
  }
  goLogin() {
    this.loginMode = !this.loginMode;
  }
  onLogin() {
    this.loading = true;

    this.authService.onLogin(this.loginForm.value).subscribe(
      res => {
        this.loading = false;
        this.route.navigate(['feed']);
        const profileData = {};
        this.profileService
          .onProfileUpdate(profileData)
          .profileUpdate.subscribe(profile => {
            console.log(profile);
          });
      },
      err => {
        this.error = err.error;
        this.loading = false;
        console.log(err);
      }
    );
  }
}
