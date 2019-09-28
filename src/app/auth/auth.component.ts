import {
  Component,
  OnInit,
  ViewChild,
  OnChanges,
  DoCheck,
  OnDestroy
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit, OnDestroy {
  @ViewChild('sf', { static: false }) signupForm: NgForm;
  @ViewChild('lf', { static: false }) loginForm: NgForm;
  Form: NgForm;
  loginMode = false;
  loading = false;
  emailLogin = '';
  error = {};
  constructor(private authService: AuthService, private route: Router) {}
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
          this.error = err.error;
          this.loading = false;
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
        this.route.navigate(['']);
      },
      err => {
        this.error = err.error;
        this.loading = false;
        console.log(err);
      }
    );
  }
}
