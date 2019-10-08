import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth.service';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  @ViewChild('rpf', { static: false }) Password: NgForm;
  loading = false;
  message: string;
  showlogin = false;
  constructor(
    private authService: AuthService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {}
  onResetPassword() {
    this.loading = true;
    const token = this.route.snapshot.params['token'];

    this.authService
      .resetpassword(this.Password.value.password, token)
      .subscribe(
        (message: { message: string }) => {
          if (message.message === 'changed') {
            this.Password.reset();
            this.loading = false;
            this.showlogin = true;
            this.message =
              'Password changed! Try logging with new password now!';
          }
        },
        err => {
          this.Password.reset();
          this.loading = false;
          this.message = 'Something went Wrong Try again later!';
        }
      );
  }
}
