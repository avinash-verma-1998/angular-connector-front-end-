import {
  Component,
  OnInit,
  Input,
  ViewChild,
  EventEmitter,
  Output
} from '@angular/core';

import { FeedService } from '../feed.service';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  @ViewChild('cf', { static: false }) comment: NgForm;
  @Input() username: string;
  @Input() image: string;
  @Input() caption: string;
  @Input() comments: [];
  @Input() likes: [];
  @Input() postId: string;
  @Output() showBackdrop: EventEmitter<string>;
  liked: boolean;
  commenting: boolean;

  constructor(private feedService: FeedService, private route: Router) {
    this.showBackdrop = new EventEmitter();
  }

  ngOnInit() {
    this.liked = this.feedService.checkIfliked(this.likes);
  }
  onLiked() {
    this.feedService.likePost(this.postId, this.liked).subscribe(() => {});
    this.liked = !this.liked;
  }
  loadComments() {
    this.commenting = !this.commenting;
  }
  postComment() {
    this.feedService
      .comment(this.postId, this.comment.value.comment)
      .subscribe(() => {
        this.commenting = false;
        this.route.navigate(['/feed']);
      });
  }
  displayPostModal() {
    this.showBackdrop.emit('clicked');
  }
}
