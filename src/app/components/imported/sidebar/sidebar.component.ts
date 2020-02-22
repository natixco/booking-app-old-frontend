import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animations } from '../../../../assets/animations';
import { AuthService } from '@services/auth/auth.service';
import { UserService } from '@services/user/user.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.sass']
  ,animations: [
    Animations.toggleUserDropdown,
    Animations.rotateIcon,
  ]
})
export class SidebarComponent implements OnInit {

  userDropdownIsOpened: string = 'false';
  userInfo: Object;

  constructor(
    public _Router: Router,
    private _AuthService: AuthService,
    private _UserService: UserService
  ) {
    this._UserService._userInfo.subscribe((data: Object) => {
      this.userInfo = data;
    })
  }

  ngOnInit() {
    if(this.userInfo['user'] === undefined) {
      this._UserService.getUserInfo();
    }
  }

  toggleUserDropdown() {
    this.userDropdownIsOpened = this.userDropdownIsOpened === 'false' ? 'true' : 'false';
  }

  logout() {
    this._AuthService.logout().subscribe(
      res => {
        this._Router.navigate(['/auth/logged-out']);
        this._UserService._userInfo.next({});
      },
      err => {
        console.log(err);
      }
    )
  }
}
