import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FeedComponent } from './feed/feed.component';
import { AuthComponent } from './auth/auth.component';
import { CreatePostComponent } from './feed/create-post/create-post.component';
import { ResetComponent } from './auth/reset/reset.component';
import { SinglePostComponent } from './feed/single-post/single-post.component';
import { LoaderComponent } from './loader/loader.component';
import { ProfileComponent } from './profile/profile.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: 'feed', component: FeedComponent },
  { path: 'loader', component: LoaderComponent },

  { path: 'feed/:id', component: SinglePostComponent },
  { path: 'createpost', component: CreatePostComponent },
  { path: '', component: AuthComponent, canActivate: [AuthGuard] },
  { path: 'reset', component: ResetComponent },
  { path: 'profile', component: ProfileComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
