import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { FeedService } from '../feed.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @Input() username: string;
  @Input() image: string;
  @Input() caption: string;
  @Input() comments: [];
  @Input() likes: [];
  @Input() postId: string;
  constructor(private feedService: FeedService) {}

  ngOnInit() {}
  onLiked() {
    this.feedService.likePost(this.postId).subscribe(() => {});
  }
}
