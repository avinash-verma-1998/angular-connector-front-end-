import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from './single-post/post.model';
import { AuthService } from '../auth/auth.service';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { PostInterface } from './post/post.interface';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  showModal: boolean;
  currentPost = new BehaviorSubject<Post>(null);
  constructor(private http: HttpClient, private authService: AuthService) {}
  onCreatePost(post) {
    return this.http.post(environment.backendUrl + 'post/create', post);
  }
  deleteCommentById(commentId, postId) {
    return this.http.delete(
      environment.backendUrl + `post/uncomment/${postId}/${commentId}`
    );
  }
  fetchPost() {
    return this.http.get(environment.backendUrl + 'post/getall');
    // .pipe(
    //   tap((postdata: []) => {
    //     this.postArray.next(postdata);
    //     console.log(this.postArray.getValue());
    //   })
    // );
  }

  getSinglePost(id: string) {
    return this.http.get(environment.backendUrl + `post/${id}`).pipe(
      tap((post: PostInterface) => {
        const newpost: Post = new Post(
          post._id,
          post.postImageUrl,
          post.caption,
          post.comments,
          post.likes
        );
        this.currentPost.next(newpost);
      })
    );
  }
  likePost(postId: string, like: boolean) {
    if (like) {
      return this.http.get(environment.backendUrl + `post/unlike/${postId}`);
    }
    if (!like) {
      return this.http.get(environment.backendUrl + `post/like/${postId}`);
    }
  }
  checkIfliked(likesArray: []): boolean {
    const userId = this.authService.user.getValue().id;
    return likesArray.some(userLikes => userLikes === userId);
  }
  comment(postId: string, comment: string) {
    return this.http.post(environment.backendUrl + `post/comment/${postId}`, {
      comment
    });
  }
  displayModal(show: boolean) {
    this.showModal = show;
  }
  deletePostById(postId) {
    return this.http.delete(environment.backendUrl + `post/delete/${postId}`);
  }
}
