import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  userInfo: Object;
  _userInfo: BehaviorSubject<Object> = new BehaviorSubject<Object>({});

  constructor(
    private _AuthService: AuthService,
    private _HttpClient: HttpClient
  ) {
    this._userInfo.subscribe((data: Object) => {
      this.userInfo = data;
    });
  }
  
  getUserInfo() {
    this._HttpClient.post('http://auth.localhost.net:3001/api/user', null).subscribe(
      res => {
        this._userInfo.next({
          user: res['user'],
          company: res['company'],
          bookings: res['bookings']
        })
      },
      err => {
        console.log(err);
      }
    )
  }
}
