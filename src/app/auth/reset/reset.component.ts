import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '../auth.service';
import { R3FactoryDelegateType } from '@angular/compiler/src/render3/r3_factory';

@Component({
  selector: 'app-reset',
  templateUrl: './reset.component.html',
  styleUrls: ['./reset.component.css']
})
export class ResetComponent implements OnInit {
  @ViewChild('rf', { static: false }) resetForm: NgForm;
  constructor(private authService: AuthService) {}
  loading = false;
  message: string;
  ngOnInit() {}
  onReset() {
    this.loading = true;
    this.authService.resetEmail(this.resetForm.value.email).subscribe(
      res => {
        console.log(res);
        this.message = 'email sent';
        this.loading = false;
      },
      err => {
        console.log(err);
        this.loading = false;
      }
    );
  }
}
