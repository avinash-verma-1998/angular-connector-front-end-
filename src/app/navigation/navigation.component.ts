import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';
import { ProfileService } from '../profile/profile.service';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  user: string;
  profileImage: string;
  constructor(
    private authService: AuthService,
    private profileService: ProfileService,
    private route: Router
  ) {}

  ngOnInit() {
    this.user = this.authService.user.getValue().username;
    this.profileService.fetchProfile().subscribe(profile => {
      this.profileImage = profile.profileImageUrl;
    });
  }
  onlogout() {
    this.authService.user.next(null);
    localStorage.removeItem('user');
    this.route.navigate(['']);
  }
}
