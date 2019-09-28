import { AuthService } from './auth.service';
import { User } from './user.model';

import { take, exhaustMap } from 'rxjs/operators';
import {
  HttpRequest,
  HttpHandler,
  HttpInterceptor
} from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    return this.authService.user.pipe(
      take(1),
      exhaustMap((user: User) => {
        if (user !== null) {
          const token = user.token;
          const clonedRequest = req.clone({
            headers: req.headers.set('Authorization', token)
          });
          return next.handle(clonedRequest);
        } else {
          return next.handle(req);
        }
      })
    );
  }
}
