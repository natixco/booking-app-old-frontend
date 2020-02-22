import { Injectable } from '@angular/core';
import { HttpInterceptor } from '@angular/common/http';
import { AuthService } from '@services/auth/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor(
    private _AuthService: AuthService,
    private _CookieService: CookieService
  ) { }

  intercept(req, next) {
    let tokenizedReq;

    if(req.url === '/api/login' || req.url === '/api/book') {
      tokenizedReq = req.clone({
        setHeaders: {
          'X-CSRF-Token': `${this._AuthService.getXCSRFToken()}`
        }
      })
    } else if(req.url === '/api/logout') {
      return next.handle(req);
    } else {
      tokenizedReq = req.clone({
        withCredentials: true,
        setHeaders: {
          'Authorization': `Bearer ${this._AuthService.getAccessToken()}`
        }
      })
    }

    return next.handle(tokenizedReq);
  }
}
