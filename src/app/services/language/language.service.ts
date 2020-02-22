import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  constructor(
    private _TranslateService: TranslateService
  ) { }

  changeLang(lang: string) {
    this._TranslateService.use(lang);
  }
}
