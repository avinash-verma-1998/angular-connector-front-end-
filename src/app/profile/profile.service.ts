import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class ProfileService {
  constructor(private http: HttpClient) {}
  onProfileUpdate(profileFormData) {
    const profileData = {};
    const userData = {};
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
        'http://localhost:5000/profile/edit',
        profileData
      ),
      userUpdate: this.http.post('http://localhost:5000/user/edit', userData)
    };
  }
  fetchProfile() {
    return this.http.get('http://localhost:5000/profile/current');
  }
}
