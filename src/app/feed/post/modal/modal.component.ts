import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FeedService } from '../../feed.service';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit, OnDestroy {
  @Input() postId: string;
  // routeSubscription: any;
  constructor(private feedService: FeedService, private router: Router) {
    // this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    // this.routeSubscription = this.router.events.subscribe(event => {
    //   if (event instanceof NavigationEnd) {
    //     this.router.navigated = false;
    //   }
    // });
  }

  ngOnInit() {}
  deletePost() {
    this.feedService.deletePostById(this.postId).subscribe(() => {
      this.router
        .navigateByUrl('/loader', { skipLocationChange: true })
        .then(() => {
          this.router.navigate(['/feed']);
        });
    });
  }
  ngOnDestroy() {
    // this.routeSubscription.unsubscribe();
  }
}
