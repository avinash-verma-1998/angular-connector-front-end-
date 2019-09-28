import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';
import { AuthService } from '../auth/auth.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private http: HttpClient, private authService: AuthService) {}
  onCreatePost(post) {
    return this.http.post('http://localhost:5000/post/create', post);
  }
  // onCreatePost(caption: string) {
  //   return this.http.post('http://localhost:5000/post/create', { caption });
  // }
  fetchPost() {
    return this.http.get('http://localhost:5000/post/getall');
    // .pipe(
    //   tap((postdata: []) => {
    //     this.postServiceArray = postdata;
    //   })
    // );
  }
  likePost(postId: string) {
    return this.http.get(`http://localhost:5000/post/like/${postId}`);
  }
}
