import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LanguageService } from '@services/language/language.service';
import { TitleService } from '@services/title/title.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.sass']
})
export class AccountComponent implements OnInit {

  accountForm: FormGroup;
  passwordForm: FormGroup;
  currentlang: string;
  languages: Object = [
    {
      "code": "en",
      "lang": "English"
    },
    {
      "code": "nl",
      "lang": "Nederlands"
    },
    {
      "code": "hu",
      "lang": "Magyar"
    },
    {
      "code": "de",
      "lang": "Deutsch"
    },
    {
      "code": "fr",
      "lang": "Française"
    },
    {
      "code": "sv",
      "lang": "Svenska"
    },
  ]

  constructor(
    private _LanguageService: LanguageService,
    private _TitleService: TitleService,
  ) {
    this.accountForm = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required)
    })

    this.passwordForm = new FormGroup({
      newPassword: new FormControl('', Validators.required),
      confirmNewPassword: new FormControl('', Validators.required)
    })

    this.currentlang = localStorage.getItem('language');
    this._TitleService.setTitle('SIDEBAR.youracc');
  }

  get _accountForm() {
    return this.accountForm.controls;
  }

  get _passwordForm() {
    return this.passwordForm.controls;
  }

  ngOnInit() {
  }

  changeLang(lang: string) {
    this._LanguageService.changeLang(lang);
    localStorage.setItem('language', lang);
  }

}
