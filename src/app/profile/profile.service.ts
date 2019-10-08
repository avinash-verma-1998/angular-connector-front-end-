import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Profile } from './profile.interface';

interface UserData {
  name?: string;
  username?: string;
  email?: string;
}
@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}
  getUserPost() {
    return this.http.get(environment.backendUrl + 'post/getpost');
  }

  onProfileUpdate(profileFormData) {
    const profileData: Profile = {};
    const userData: UserData = {};
    if (profileFormData.name) {
      userData.name = profileFormData.name;
    }
    if (profileFormData.username) {
      userData.username = profileFormData.username;
    }
    if (profileFormData.email) {
      userData.email = profileFormData.email;
    }
    if (profileFormData.website) {
      profileData.website = profileFormData.website;
    }
    if (profileFormData.bio) {
      profileData.bio = profileFormData.bio;
    }
    if (profileFormData.gender) {
      profileData.gender = profileFormData.gender;
    }
    // console.log(profileData, userData);
    return {
      profileUpdate: this.http.post(
        environment.backendUrl + 'profile/edit',
        profileData
      ),
      userUpdate: this.http.post(environment.backendUrl + 'user/edit', userData)
    };
  }
  fetchProfile() {
    return this.http.get(environment.backendUrl + 'profile/current');
  }
  updateProfileImage(profileData) {
    return this.http.post(environment.backendUrl + 'profile/edit', profileData);
  }
}
