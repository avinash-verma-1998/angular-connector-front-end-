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
  error = {};

  constructor(private authService: AuthService) {}
  ngOnDestroy() {
    this.error = {};
  }

  ngOnInit() {}
  onSignup() {
    if (this.signupForm.valid) {
      this.loading = true;
      this.authService.onSignup(this.signupForm.value).subscribe(
        res => {
          this.loading = false;
          // console.log(res);
        },
        err => {
          this.error = err.error;
          this.loading = false;
        }
      );
    }

    this.signupForm.reset();
  }
  goLogin() {
    this.loginMode = !this.loginMode;
  }
  onLogin() {
    this.authService.onLogin(this.loginForm.value).subscribe(
      res => {
        console.log(res);
      },
      err => {
        this.error = err.error;
      }
    );
  }
}
