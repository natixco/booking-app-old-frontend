import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class AuthService{
  
  constructor(
    private _HttpClient: HttpClient,
    private _CookieService: CookieService
  ) {}

  signup(user: any) {
    return this._HttpClient.post('http://localhost:3001/api/register', user);
  }

  login(user: any) {
    return this._HttpClient.post('/api/login', user);
  }

  logout() {
    return this._HttpClient.post('/api/logout', null);
  }

  isLoggedIn() {
    return this._CookieService.check('token');
  }

  getAccessToken() {
    return this._CookieService.get('token');
  }

  getXCSRFToken() {
    return this._CookieService.get('_XCSRF');
  }

  getTokenInJSON() {
    let token = this.getAccessToken();
    let token2 = JSON.stringify({token});
    return token2;
  }

  forgotPassword(data: Object) {
    return this._HttpClient.post('http://auth.localhost.net:3001/api/reset_password', data);
  }

  renewCSRF() {
    this._HttpClient.get('/api').subscribe(
      res => {
        console.log('👌 Renewed CSRF');
      },
      err => {
        console.log(err);
      }
    );
  }
}
