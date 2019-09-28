import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { LoaderComponent } from './loader/loader.component';
import { FeedComponent } from './feed/feed.component';
import { PostComponent } from './feed/post/post.component';
import { CreatePostComponent } from './feed/create-post/create-post.component';
import { AuthInterceptor } from './auth/auth.interceptor.service';
import { ResetComponent } from './auth/reset/reset.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    LoaderComponent,
    FeedComponent,
    PostComponent,
    CreatePostComponent,
    ResetComponent
  ],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
