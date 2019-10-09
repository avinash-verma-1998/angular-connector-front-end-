import { Component, OnInit, ViewChild, OnChanges } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ProfileService } from './profile.service';
import { AuthService } from '../auth/auth.service';
import { PostInterface } from '../feed/post/post.interface';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnChanges {
  @ViewChild('pf', { static: false }) profileForm: NgForm;
  saved = false;
  editProfile = false;
  user;
  loading = false;
  imageUrls;
  file;
  profileImageModal = false;
  profile: any = {
    bio: '',
    website: '',
    gender: 'Male',
    profileImageUrl: ''
  };
  constructor(
    private profileService: ProfileService,
    private authService: AuthService
  ) {}
  ngOnChanges() {}
  ngOnInit() {
    this.profileService.getUserPost().subscribe((posts: []) => {
      this.imageUrls = posts.map(
        (post: PostInterface) =>
          'https://social-node-rest-api.herokuapp.com/' + post.postImageUrl
      );
      console.log(this.imageUrls);
    });
    this.profileService.fetchProfile().subscribe(profile => {
      this.profile = { ...profile };
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
  updateProfileImage() {
    this.profileImageModal = true;
  }
  edit() {
    this.editProfile = !this.editProfile;
  }
  onSelected(event) {
    this.file = event.target.files[0];
  }
  goBack() {
    this.profileImageModal = false;
  }
  onUpdateProfile() {
    const formData = new FormData();

    formData.append('image', this.file, this.file.name);
    this.loading = true;
    this.profileService.updateProfileImage(formData).subscribe(profile => {
      this.profile = { ...profile };
      this.saved = true;
      setTimeout(() => {
        this.loading = false;
        this.saved = false;
        this.profileImageModal = false;
      }, 2000);
    });
  }
}
