import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { AuthComponent } from './auth/auth.component';
import { CreatePostComponent } from './feed/create-post/create-post.component';

const routes: Routes = [
  { path: '', component: FeedComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'createpost', component: CreatePostComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
