import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FeedService {
  constructor(private http: HttpClient) {}
  onCreatePost(post) {
    return this.http.post('http://localhost:5000/post/create', post);
  }
  // onCreatePost(caption: string) {
  //   return this.http.post('http://localhost:5000/post/create', { caption });
  // }
  fetchPost() {
    return this.http.get('http://localhost:5000/post/getall');
  }
}
