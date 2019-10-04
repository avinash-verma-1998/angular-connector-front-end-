import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  @ViewChild('pf', { static: false }) profileForm: NgForm;
  saved = false;
  editProfile = false;
  user;
  profile = {
    bio: '',
    website: '',
    gender: 'Male',
    profileImageUrl: ''
  };
  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.profileService.fetchProfile().subscribe(profile => {
      if (profile.profile == false) {
        this.editProfile = true;
      } else {
        this.profile = profile;
      }
      console.log(profile);
    });
    this.user = this.authService.user.getValue();
  }
  profileUpdate() {
    this.profileService
      .onProfileUpdate(this.profileForm.value)
      .profileUpdate.subscribe(profile => {
        this.saved = true;
        setTimeout(() => {
          this.saved = false;
        }, 2000);
        this.profileService
          .onProfileUpdate(this.profileForm.value)
          .userUpdate.subscribe(user => {
            console.log(user);
          });
      });
  }
  edit() {
    this.editProfile = !this.editProfile;
  }
}
