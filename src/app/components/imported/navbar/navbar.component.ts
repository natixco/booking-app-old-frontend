import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Animations } from '../../../../assets/animations';
import { AuthService } from '@services/auth/auth.service';
import { UserService } from '@services/user/user.service';
import { LanguageService } from '@services/language/language.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.sass'],
  animations: [
    Animations.rotateIcon,
    Animations.toggleDropdown,
    Animations.toggleLanguageSelector
  ]
})
export class NavbarComponent implements OnInit {

  userDropdownIsOpened: string = 'false';
  userInfo: Object;

  currentLang: string;
  flagPath: string;
  langSelectorIsOpened: string = 'false';

  constructor(
    private _AuthService: AuthService,
    private _UserService: UserService,
    private _LanguageService: LanguageService,
    private _Router: Router
  ) {
    this._UserService._userInfo.subscribe((data: Object) => {
      this.userInfo = data;
      console.log(this.userInfo);
    })
  }

  ngOnInit() {
    this.currentLang = localStorage.getItem('language');
    this.flagPath = `../../assets/flags/${this.currentLang}.svg`;

    if(this.userInfo['user'] === undefined) {
      this._UserService.getUserInfo();
    }
  }

  changeLanguage(lang: string) {
    localStorage.setItem('language', lang);
    this.currentLang = localStorage.getItem('language');
    this._LanguageService.changeLang(this.currentLang);
    this.flagPath = `../../assets/flags/${this.currentLang}.svg`;
  }

  toggleLanguageSelector() {
    this.langSelectorIsOpened = this.langSelectorIsOpened === 'false' ? 'true' : 'false';
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
