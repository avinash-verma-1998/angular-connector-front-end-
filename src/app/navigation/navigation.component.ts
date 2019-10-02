import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit() {}
  onlogout() {
    this.authService.user.next(null);
    localStorage.removeItem('user');
    this.route.navigate(['']);
  }
}
