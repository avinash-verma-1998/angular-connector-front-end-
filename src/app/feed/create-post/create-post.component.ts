import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { FeedService } from '../feed.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-create-post',
  templateUrl: './create-post.component.html',
  styleUrls: ['./create-post.component.css']
})
export class CreatePostComponent implements OnInit {
  @ViewChild('cp', { static: false }) private postForm: NgForm;
  file = null;
  posting = false;
  constructor(private feedService: FeedService, private route: Router) {}

  ngOnInit() {}
  onSelected(event) {
    this.file = event.target.files[0];
  }

  onPostSubmit() {
    this.posting = true;
    console.log(this.posting);
    const formData = new FormData();
    formData.append('caption', this.postForm.value.caption);
    formData.append('image', this.file, this.file.name);
    this.feedService.onCreatePost(formData).subscribe(
      res => {
        this.posting = false;
        this.route.navigate(['/feed']);
      },
      err => {
        this.posting = false;
        this.route.navigate(['/feed']);
      }
    );
  }
}
