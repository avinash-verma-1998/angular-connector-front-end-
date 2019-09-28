import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { AuthComponent } from './auth/auth.component';
import { CreatePostComponent } from './feed/create-post/create-post.component';
import { ResetComponent } from './auth/reset/reset.component';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'createpost', component: CreatePostComponent },
  { path: '', component: AuthComponent },
  { path: 'reset', component: ResetComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
