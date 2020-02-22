import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { AuthService } from '@services/auth/auth.service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {

  title = 'bookly';
  // notifications: any = [
  //   {
  //     "title": "New booking",
  //     "description": "You have a new booking for plumbing, at 12, Sept, 18 AM.",
  //     "icon": "icon-person"
  //   },
  //   {
  //     "title": "New booking2",
  //     "description": "You have a new booking for plumbing, at 12, Sept, 18 AM.",
  //     "icon": "icon-chevron-left"
  //   }
  // ]
  notifications: any = [];

  constructor(
    public _Router: Router,
    private _HttpClient: HttpClient,
    private _TranslateService: TranslateService,
    private _AuthService: AuthService
  ) {
  }

  ngOnInit() {
    this.setLanguage();
    this.userWarning();



    this._AuthService.renewCSRF();
  }

  userWarning() {
    let warning1 = "STOP!";
    let warning2 = "If somebody told you to make a Bookly feature available or to hack into someone's account, you need to copy and paste here something, that is a cheat and it gives them access to your account.\nDo not paste here anything!";
    let warning3 = "If you need help with anything, contact with us at \nhttps://www.bookly.com/support\nor\nhttps://www.strance.com/support";

    console.log(`%c${warning1}`, "color: red; text-shadow: 1px 1px solid black; font-size: 100px; font-family: sans-serif;");
    console.log(`%c${warning2}`, "color: rgba(255,255,255,.9); text-shadow: 1px 1px black; font-size: 22px; font-family: sans-serif;");
    console.log(`%c${warning3}\n\n\n\n\n\n\n\n`, "color: rgba(255,255,255,.9); text-shadow: 1px 1px black; font-size: 22px; font-family: sans-serif;");
  }

  setLanguage() {
    this._TranslateService.addLangs(['en', 'hu', 'nl', 'sv', 'fr']);

    const browserLang = this._TranslateService.getBrowserLang();

    if (localStorage.getItem('hasLoadedBefore') === null) {
      localStorage.setItem('hasLoadedBefore', 'true');
      localStorage.setItem('language', browserLang.match(/en|hu|nl|sv|fr/) ? browserLang : 'en');
      this._TranslateService.use(localStorage.getItem('language'));
    } else {
      this._TranslateService.use(localStorage.getItem('language'));
    }
  }

}
