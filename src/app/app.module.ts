import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from './loader/loader.component';
import { HttpClientModule } from '@angular/common/http';
import { FeedComponent } from './feed/feed.component';

@NgModule({
  declarations: [AppComponent, AuthComponent, LoaderComponent, FeedComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
