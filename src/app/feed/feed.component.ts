import { Component, OnInit } from '@angular/core';
import { FeedService } from './feed.service';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-feed',
  templateUrl: './feed.component.html',
  styleUrls: ['./feed.component.css']
})
export class FeedComponent implements OnInit {
  posts: [];
  deletePostId = null;

  showBackdrop = false;
  constructor(
    private feedService: FeedService,
    private authService: AuthService,

    private route: Router
  ) {}

  ngOnInit() {
    // check if token exists

    this.feedService.fetchPost().subscribe((postdata: []) => {
      this.posts = postdata;
    });
  }
  goBack() {
    this.showBackdrop = false;
  }
  onshowBackdrop(message) {
    this.deletePostId = message;
    this.showBackdrop = !this.showBackdrop;
  }
}
