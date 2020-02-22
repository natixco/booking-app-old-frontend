import { Injectable } from '@angular/core'
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '@services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserGuard implements CanActivate {

  constructor(
    private _AuthService: AuthService,
    private _Router: Router
  ) {}

  canActivate() {
    if(this._AuthService.isLoggedIn()) {
      return true;
    } else {
      this._Router.navigate(['/auth/login']);
      return false;
    }
  }
  
}
