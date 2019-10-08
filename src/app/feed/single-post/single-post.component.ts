import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FeedService } from '../feed.service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { AuthService } from '../../auth/auth.service';
import { PostInterface } from '../post/post.interface';
import { Post } from './post.model';

@Component({
  selector: 'app-single-post',
  templateUrl: './single-post.component.html',
  styleUrls: ['./single-post.component.css']
})
export class SinglePostComponent implements OnInit, OnDestroy {
  @ViewChild('cf', { static: false }) comment: NgForm;
  post;
  likes;
  liked: boolean;
  commenting: boolean;
  userId = this.authService.user.getValue().id;

  postId: string;
  currentPost: Subscription;
  constructor(
    private authService: AuthService,
    private feedService: FeedService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    this.postId = this.route.snapshot.params['id'];

    this.feedService.getSinglePost(this.postId).subscribe(() => {
      this.currentPost = this.feedService.currentPost.subscribe(
        (post: Post) => {
          console.log(post);
          this.liked = this.feedService.checkIfliked(post.likes);
          this.post = post;
          this.likes = post.likes.length;
          this.commenting = true;
        }
      );
    });
  }

  onLiked() {
    this.feedService.likePost(this.postId, this.liked).subscribe(() => {
      this.feedService.getSinglePost(this.postId).subscribe(postData => {
        this.liked = postData.likes.some(userId => userId === this.userId);
      });
    });
  }
  onLoadComments() {
    this.commenting = !this.commenting;
  }
  addComment() {
    console.log(this.comment.value);
    this.feedService
      .comment(this.postId, this.comment.value.comment)
      .subscribe(() => {
        this.feedService.getSinglePost(this.postId).subscribe(() => {});
        this.comment.resetForm();
      });
  }
  deleteComment(id) {
    console.log(id);
    this.feedService.deleteCommentById(id, this.postId).subscribe(() => {
      this.feedService.getSinglePost(this.postId).subscribe(() => {});
      this.commenting = true;
    });
  }
  // commentTime(createdAt: number): number {
  //   const currentDate = new Date().getMilliseconds();
  //   const time = currentDate - createdAt;
  //   console.log(currentDate, createdAt, time);
  //   return time;
  // }
  ngOnDestroy() {
    this.currentPost.unsubscribe();
  }
}
